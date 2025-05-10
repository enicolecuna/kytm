import React, { useState } from 'react';
import './AddItem.css';
import uploadIcon from '../assets/upload.png';
import Sidebar from '../components/Sidebar';

function AddItem() {

    const [formData, setFormData] = useState({
        name: '',
        category:'',
        description: '',
        quantity: '',
        weight: '',
        price:'',
        images: [] //image is an array because we are going to use it as a file input and we can select multiple files at once
    });

    const [preview, setPreview]=useState([]);//why null instead of ''? because we are going to use it as a URL for the image preview
    //[] is an array because we are going to use it as a file input and we can select multiple files at once
    const handleChange = (e) =>{
        const { name, value } = e.target;// Destructure name and value from the event target
        setFormData(prev => ({// Create a new object with the previous state and update the value of the specified name with the new value
            ...prev, // Spread operator to copy the previous state
            [name]: value //[] means that the name is dynamic and can be any key in the formData object
          }));
    }

    const handleImageChange = (e)=> {
        //const files = e.target.files[0];// Get the first file from the file input [0] means the first file in the array of files
       const files=Array.from(e.target.files); // Convert the FileList to an array using Array.from() to handle multiple files
        if(files.length >0){
            setFormData(prev=>({...prev, images: files})); //prev state is put inside () to create a new object while the ({}) is used to create a new object with the previous state and update the image key with the new file
            
           // setPreview(URL.createObjectURL(file));
           setPreview(files.map(file=> URL.createObjectURL(file))); //map is used to create a new array with the URLs of the files
        }
    };
    const handleSubmit = (e) => {// (e)=> means that this is an arrow function that takes an event as an argument
        e.preventDefault();
        console.log('Submitting form with', formData);
    }
    return (
        <div className="dashboard-page">
      <Sidebar firstName="John" lastName="Doe" />
    <div className="add-item-page">
        <input 
        type="text" 
        className="search-bar"
        placeholder="Search..." 
        name="name"
        value={formData.name}
        onChange={handleChange} //handleChange is a function that updates the state of the formData object when the user types in the input field
        />
        <h2>Add Item</h2>
        <form className="item-form" onSubmit={handleSubmit}>
            
            <label className ="upload-box">
             
            {preview.length === 0 ? (
  <img src={uploadIcon} alt="upload" className="upload-icon" />
) : null}
                <input
                type="file"
                accept="image/*" //accept attribute specifies the types of files that the server accepts. In this case, it is set to accept all image types
                multiple
                onChange={handleImageChange} //handleImageChange is a function that updates the state of the formData object when the user selects an image file
                name="images" //name attribute is used to identify the input field in the formData object
                style={{ display: 'none' }} //style attribute is used to hide the input field from the user
                />
                <div className="preview-gallery">
                    {preview.map((src, index) => (
                        <div className="preview-card" key={index}>
                        <img src={src} alt={`preview-${index}`} />
                        </div>
                    ))}
                    </div>

            </label>
            {/**preview is a newly created state variable that holds the URL of the image to be previewed
            putting in in {} means it is a variable */}
            <div className="form-fields">
            <label>
            Product Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
            Category
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
            </label>
            <label>
            Quantity
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
            </label>
            <label>
            Description
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </label>
            <label>
            Weight
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
            </label>
            <label>
            Price
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
            </label>
            </div>

        <button type="submit" className="submit-btn">Submit Item</button>

        </form>
    </div>
    </div>
  );
  }   
  export default AddItem;