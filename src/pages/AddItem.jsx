import React, { useState } from 'react';
import './AddItem.css';
import uploadIcon from '../assets/upload.png';
import Sidebar from '../components/Sidebar';

// explain what is happening in const here whether thats form data, preview, mainImage, name, files and why some has usetstate while other do not
// const [formData, setFormData] = useState({ ... }) initializes the state for the form data with default values
// const [preview, setPreview] = useState([]); initializes the state for the preview with an empty array
// const [mainImage, setMainImage] = useState(null); initializes the state for the main image with null
// const [formData, setFormData] = useState({ ... }) initializes the state for the form data with default values
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
function AddItem() {

 
  const [formData, setFormData] = useState({
    
    // The keys in this object should match the keys expected by your backend API
    // The values are initialized to empty strings or arrays
    NameofProduct: '',
    Category: '',
    Description: '',
    Quantity: '',
    Weight: '',
    Price: '',
    Image: '',
    Thumbnails: []
  });

  const [preview, setPreview] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the new value for the specific field
    // The spread operator (...) is used to copy the existing formData and then update the specific field
    //if the  form data is being  updated then why is there name and value in the const
    // The name and value are coming from the input field that triggered the change event
    // The name attribute of the input field corresponds to the key in the formData object
    // The value is the new value entered by the user in that input field
    // This allows us to dynamically update the formData state based on which input field is being changed
    setFormData((prev) => ({
        //setFormData((prev) => ({ is a function that takes the previous state as an argument and returns a new state object
        // after prev comma is the [name] which is the name of the input field and value is the new value entered by the user
        //[] means that we are using the value of name as the key in the object
        // : is used to assign the value to the key in the object
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert(`"${file.name}" is too large. Please upload files under 2MB.`);
        return;
      }
    }
    const base64Promises = files.map(file => toBase64(file)); // Convert files to base64 strings
    const base64Images = await Promise.all(base64Promises); // Wait for all conversions to complete
      setFormData((prev) => ({ ...prev, Image:base64Images[0], Thumbnails: base64Images.slice(1) }));// Update formData with the first image as main and the rest as thumbnails

      setPreview(base64Images);// Set preview images
      setMainImage(base64Images[0]); // default to first
      
    
  };

  const handleThumbnailClick = (src) => {
    if (src !== mainImage) {
      setMainImage(src);// Set the clicked thumbnail as the main image 
      
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Submitting form with', formData);

   try{
    const token = localStorage.getItem('token'); // Get the token from local storage
    
    const res = await fetch('http://localhost:5000/api/products',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the token to the headers

      },
      body: JSON.stringify(formData)
    })
    const data = await res.json();
    if (res.ok){
      console.log('Item added successfully:', data);
      // Reset the form data and preview images
      setFormData({
        NameofProduct: '',
        Category: '',
        Description: '',
        Quantity: '',
        Weight: '',
        Price: '',
        Image: '',
        Thumbnails: []
      });
      setPreview([]);
      setMainImage(null);
      alert('Item added successfully!');
      // Optionally, redirect or reset the form
      window.location.href = '/Dashboard';
    } else {
      console.error('Failed to add item:', data.message);
    }}catch(err){
      alert('Error adding item:', err.message);
      console.error(err);
    }
    /**  try {
    const token = localStorage.getItem('token');

    const res = await axios.post(
      'http://localhost:5000/api/products',
      formData, // Axios automatically stringifies it
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    alert('Product added successfully!');
    console.log(res.data); // Optional: see response
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    alert('Failed to add product: ' + message);
    console.error(err);
  } */
  };

  return (
    <div className="dashboard-page">
      <Sidebar firstName="John" lastName="Doe" />
      <div className="add-item-page">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          name="NameofProduct"
          value={formData.NameofProduct}
          onChange={handleChange}
        />
        <h2>Add Item</h2>
        <form className="form-wrapper" onSubmit={handleSubmit}>
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
                name="images" //this is optional not in use can be erased
                style={{ display: 'none' }}
                onChange={handleImageChange}
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
            {[// This is the array of labels and keys for the form fields
            // The labels are newly named variables while the keys are the original names from the formData object
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
                />
              </div>
            ))}
            <button type="submit" className="submit-btn">Submit Item</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
