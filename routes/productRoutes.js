const express = require("express");

const {
    getAllProducts,
    getSingleProduct,
    addProduct,
    editProduct,
    removeProduct
} = require("../controllers/productController");

const {
    cacheMiddleware
} = require("../middleware/cacheMiddleware");

const router = express.Router();


router.get(
    "/products",
    cacheMiddleware,
    getAllProducts
);


router.get(
    "/products/:id",
    cacheMiddleware,
    getSingleProduct
);


// CREATE
router.post(
    "/products",
    addProduct
);


router.put(
    "/products/:id",
    editProduct
);


router.patch(
    "/products/:id",
    editProduct
);


router.delete(
    "/products/:id",
    removeProduct
);


module.exports = router;
