import React, { useState, useEffect } from 'react';
import './AddItem.css'; // Reuse same styles for consistency
import Sidebar from '../components/Sidebar';
import uploadIcon from '../assets/upload.png';
import { useParams, useNavigate } from 'react-router-dom';


function EditItem() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState({
    NameofProduct: '',
    Category: '',
    Description: '',
    Quantity: '',
    Weight: '',
    Price: '',
    Image:'',
    Thumbnails: []
  });

  const [preview, setPreview] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchItem =async ()=>{
      try{
        const res = await fetch(`http://localhost:5000/api/products`);
        const data =await res.json();
        const item =data.products.find(p => p._id === id);
        if (item){
          setFormData(item);
          const thumbs = [item.Image, ...item.Thumbnails];
          setPreview(thumbs);
          setMainImage(item.Image);
        }else{
          alert('Item not found');
        }
      }catch(err){
        console.error('Error fetching item:', err);
        alert('Error fetching item: ' + err.message);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailClick = (src) => {
    if (src !== mainImage) setMainImage(src);
  };

  const handleUpdate =  async(e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token'); // Get the token from local storage
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Item updated successfully');
        navigate('/Dashboard');
      } else {
        alert('Failed to update item');
      }
    }catch(err){
      alert('Error updating item: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async() => {
    try{
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok){
        alert('Item deleted succesfully');
        navigate('/Dashboard');
      }else{
        const data = await res.json();
        alert('Failed to delete item' + data.message);
      }
    }catch(err){
      alert('Error deleting item: ' + err.message);
      console.error(err);
    }
    
  };

  const handleSave = () => {
    console.log('Saving item changes:', formData);
    // maybe update and redirect
  };
   const handleImageChange = (e) =>{
    const files = Array.from(e.target.files);
    if(files.length >0){
      const urls = files.map((file)=> URL.createObjectURL(file)); // Convert files to URLs
      setFormData((prev) => ({ ...prev, Image: urls[0], Thumbnails: urls.slice(1) })); // Update formData with the first image as main and the rest as thumbnails
      setPreview(urls); // Set preview images
      setMainImage(urls[0]); // default to first
    }
   }


  return (
    <div className="dashboard-page">
      <Sidebar firstName="John" lastName="Doe" />
      <div className="add-item-page">
        <input type="text" className="search-bar" placeholder="Search..." />
        <h2>View or Edit item</h2>
        <form className="form-wrapper" onSubmit={handleUpdate}>
          <div className="upload-section">
        
            <label className="upload-box">
              {mainImage ? (
                <img src={mainImage} alt="Main Preview" className="main-preview" />
              ) : (
                <img src={uploadIcon} alt="Upload" className="upload-icon" />
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleImageChange}
                disabled={!isEditing}

                />
            </label>

            {preview.length > 1 && (
              <div className="preview-gallery">
                {preview.map((src, index) => (
                  <div
                    className="preview-thumb"
                    key={index}
                    onClick={() => handleThumbnailClick(src)}
                  >
                    <img src={src} alt={`thumb-${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-fields">
            {[
              ['Product Name', 'NameofProduct'],
              ['Category', 'Category'],
              ['Quantity', 'Quantity'],
              ['Description', 'Description'],
              ['Weight', 'Weight'],
              ['Price', 'Price']
            ].map(([label, key]) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <input
                  type={key === 'Quantity' ? 'number' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  disabled={!isEditing}

                />
              </div>
            ))}

<div className="button-section">
  <button type="button" className="update-btn"   onClick={() => setIsEditing(true)}
  >Update Item</button>  

  <div className="bottom-buttons">
    <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
    <button type="submit" className="save-btn" onClick={handleUpdate}>Save</button>
  </div>
</div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
