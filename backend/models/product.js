const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    NameofProduct: {type: String, required: true},
    Category : {type: String, required: true},
    Quantity : {type: Number, required: true},
    Price : {type: Number, required: true},
    Image : {type: String, required: true},
    Description : {type: String, required: true},
    Weight: {type: String},
    
    User: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
