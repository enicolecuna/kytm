
const express = require('express');

const router = express.Router();

const {getAllProducts, createProduct, updateProduct, deleteProduct} =require('../controllers/productControllers');


const { authMiddleware, adminOnly } = require('../middlewares/authMiddleware');


router.get('/', getAllProducts);

//ADMIN -create update delete products

router.post('/', authMiddleware, adminOnly, createProduct);
router.put('/:id', authMiddleware, adminOnly, updateProduct);
router.delete('/:id', authMiddleware, adminOnly, deleteProduct);

module.exports=router;