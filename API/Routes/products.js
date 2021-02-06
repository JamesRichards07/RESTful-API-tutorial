const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../Middleware/check-auth');
const ProductController = require('../controllers/products');

//Restricting data-form file types.
const fileFilter = function(req, file, cb){

    if(file.mimetype === 'image/jpeg' || 'image/png'){
    cb(null, true);
    }
    else{
    cb(null, false);
    }
};

//Storage strategy
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//routing different request types
router.get('/', ProductController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_new);

router.get('/:productId', ProductController.products_get_product);

router.patch('/:productId', checkAuth, ProductController.products_update_product);

router.delete('/:productId', checkAuth, ProductController.products_delete_product);

module.exports = router;