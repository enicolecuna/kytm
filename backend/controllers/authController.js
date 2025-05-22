const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register= async (req, res) => {
    try{
        const {firstName, lastName, phone, email, password}= req.body;

        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            firstName,
            lastName,
            phone,
            email,
            password: hashedPassword

        });
        

        await newUser.save();
        //this will save the newUser to the database with the hashed password
        
    res.status(201).json({ message: 'User registered successfully' });

    }catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    };

};

exports.login = async (req,res) =>{
    try{
        const {email, password} =req.body;
        const user =await User.findOne({email});//its inside {} because we are looking for a specific field

        if(!user){
            return res.status(401).json({message: 'Invalid email or password'});
        };

        const isMatch = await bcrypt.compare(password, user.password);//user.password is the hashed password 
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'});
        }; //if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' });

            //the user._id is the id of the user that we are signing the token 
            //_ means that it is a private field and we are not supposed to see it

        res.status(200).json({token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } }); 
        //this user object is the one we are sending to the frontend containing the user id, first name, last name and email
        //token is the one we are sending to the frontend to be stored in local storage
    }catch (error){
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });

    };
};
// the register newUser function is used to register a new user in the database. It takes the request and response objects as parameters.
// The function first checks if the user already exists in the database by querying the User model with the provided email. 
// If the user exists, it returns a 409 status code with a message indicating that the user already exists.
// If the user does not exist, the function hashes the password using bcrypt.hash and saves the user to the database using the newUser.save() method.

//it is not sent back to the frontend like the login function because we are not using the token in the register function
//the code that sends back the info to the frontend  from the login function is the one that is used to authenticate the user and send back the token and user info to the frontend
