const Product = require('../models/product');

//create products only by admin
exports.createProduct = async (req, res) =>{
    try{
        //this is the data that we are getting from the frontend
        const {NameofProduct, Category, Quantity, Price, Image, Description, Weight} =req.body;

        //this is the data that we are sending to the frontend
        const newProduct =new Product({
            NameofProduct,
            Category,
            Quantity,
            Price,
            Image,
            Description,
            Weight,
            User: req.user._id //user authentication middleware that sets req.user
        })

        await newProduct.save(); //this will save the newProduct to the database
        res.status(201).json({message:'Product created succesfully', product: newProduct}); // product: is the variable that we are sending to the frontend containing the new product
    }
    catch(err){
        res.status(500).json({message: 'Internal server error', error: err.message});
    }
}

exports.getAllProducts = async (req, res)=>{
    try{
        const products =await Product.find(); //this will find all the products in the database
        res.status(200).json({message: 'Products fetched successfully', products}); //this will send the products to the frontend

    }
    catch(err){
        res.status(500).json({message: 'Internal server error', error: err.message});
    }
}
exports.updateProduct = async (req,res)=>{
    try{
        const {id} =req.params; //this will get the id from the url
        const product = await Product.findByIdAndUpdate(id, req.body, {new:true}); //this will find the product by id and update it with the new data
        res.json({message: 'Product updated successfully', product}); //this will send the updated product to the frontend
    }
    catch(err){
        res.status(500).json({message: 'Internal server error', error: err.message});
    }
}

exports.deleteProduct = async (req,res)=>{
    try{}
    catch(err){}
}

