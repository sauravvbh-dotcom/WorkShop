const express = require("express");

const {
    getAllProducts,
    getSingleProduct
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

module.exports = router;
