const {
    getProducts,
    getProductById
} = require("../services/productService");

const { cache } = require("../middleware/cacheMiddleware");

async function getAllProducts(req, res) {
    try {
        const products = await getProducts();

        cache[req.cacheKey] = products;

        res.json(products);
    } catch (err) {
        res.status(500).json({
            error: "Error reading file"
        });
    }
}

async function getSingleProduct(req, res) {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        cache[req.cacheKey] = product;

        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: "Error reading file"
        });
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct
};
