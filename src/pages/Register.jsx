import {useState} from 'react';
import './Register.css';
import warehouseImage from '../assets/warehouses.jpg';

function Register(){
    const [form, setForm]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        phone:'',
        role:''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
    const handleSubmit=(e) =>{
        e.preventDefault();
        console.log('Registering with', form);
        //TODO: Add registration logic here
    }
    return(
        <div className="auth-page">
            <div className="auth-image"> 
                <img src={warehouseImage} alt="Warehouse" />
            </div>

            <div className="auth-container">
                <div className="auth-content">
                  <h1>K.Y. Ting Merchandise</h1>  
                  <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Welcome!</h2>
                    <p>Let's run things smoothly.</p>
                    
                    <input
                        type="text"
                        name="firstName" 
                        placeholder="First Name"
                        value={form.firstName}
                        //onChange={(e) => setForm({...form, firstName: e.target.value})}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        //onChange={(e) => setForm({...form, lastName: e.target.value})}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email" 
                        placeholder="Email"
                        value={form.email}
                        //onChange={(e) => setForm({...form, email: e.target.value})}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                         name="password"
                        placeholder="Password"
                        value={form.password}
                        //onChange={(e) => setForm({...form, password: e.target.value})}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"   
                        placeholder="Phone Number"
                        value={form.phone}
                        //onChange={(e) => setForm({...form, phone: e.target.value})}
                        onChange={handleChange}
                        required
                    />
                    <select 
                        name="role"
                        value={form.role} 
                         
                        //<form>onChange={(e) => setForm({...form, role: e.target.value})}>
                        onChange={handleChange}
                        className="auth-select"
                        required>
                      <option value="">Role</option>
                      <option value="admin">User</option>
                      <option value="admin">Admin</option>
                      <option value="user">Employee</option>
                    </select>
                    <button type="submit">Register</button>
                    </form>
                </div>
            </div> 
        </div>
    
    )
}
export default Register;