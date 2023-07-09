const express = require('express');
const router = express.Router();
const { upload } = require("../config/multer");
const ProductController = require('../controllers/Product')

router.post('/product', ProductController.create);
router.post('/product/buy', ProductController.buyProducts);
// router.get('/cardItem', ProductController.findAllToCard);
router.delete('/product/:id', ProductController.remove);
// router.delete('/deleteAllItems', ProductController.clearProducts);
// router.delete('/deleteImageItem', ProductController.deleteImage);
router.put('/product/:id', ProductController.update);
// router.put('/itemImage', ProductController.updateImage);
router.get('/product', ProductController.findAll);
router.get('/product/:id', ProductController.getProductById);

module.exports = router;