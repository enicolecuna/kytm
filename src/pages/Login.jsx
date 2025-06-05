import {useState} from 'react';
import './Login.css';
import axios from 'axios'; 
import warehouseImage from '../assets/warehouses.jpg'; 
function Login() {
    // State variables for email and password
    // These will be used to store the user's input
    // and will be updated whenever the user types in the input fields
    // The useState hook is used to create state variables in functional components
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    // This function will be called when the user submits the form
    // It will prevent the default form submission behavior and log the email and password to the console
    const handleLogin = async(e)=>{
        e.preventDefault();
        console.log('Logging in with', {email, password});
    // Here you would typically send the email and password to your server for authentication
    //TODO: Add authentication logic here

        try{
            const res = await axios.post('http://localhost:5000/api/auth/login',{
              email,
              password,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);
            console.log('Logged in user role:', res.data.user.role);

            window.location.href = '/dashboard';
        }catch(err){
          alert(err.message);
          console.error(err);
        }
    }
  return (
    <div className="login-page">
    <div className="login-image">
      <img src={warehouseImage} alt="Warehouse" />
    </div>
    <div className ="login-container-admin">
    <div className="login-content">
    <h1>K.Y. Ting Merchandise</h1>
        <form className="login-form-admin" onSubmit={handleLogin}>
        
        <h2>Welcome!</h2>
        <p>Let's run things smoothly.</p>
        <input
        type="email" 
        name="email"
        placeholder="Email"
        value={email} //email state variable is used to set the value of the email input field
        onChange={(e) =>setEmail(e.target.value)} // Update email state variable when user types in the email input from field
        required
        />
         <input
        type="password"
        name="password"
        placeholder="Password"
        value={password} //password state variable is used to set the value of the password input field
        onChange={(e) =>setPassword(e.target.value)} // Update email state variable when user types in the email input from field
        required
        />
        <button type="submit">Login</button>
        <p className="link-text">
            No account? <a href="/register">Register</a>
        </p>

      </form>
    </div>
    </div>
    </div>
  );
}
export default Login;