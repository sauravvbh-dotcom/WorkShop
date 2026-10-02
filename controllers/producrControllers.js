const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../services/productService");

const {
    cache,
    clearCache
} = require("../middleware/cacheMiddleware");


async function getAllProducts(req, res) {
    try {
        if (cache[req.cacheKey]) {
            return res.json(cache[req.cacheKey]);
        }

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
        if (cache[req.cacheKey]) {
            return res.json(cache[req.cacheKey]);
        }

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


function addProduct(req, res) {
    try {
        const product = createProduct(req.body);

        clearCache();

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({
            error: "Error creating product"
        });
    }
}


function editProduct(req, res) {
    try {
        const product = updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        clearCache();

        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: "Error updating product"
        });
    }
}


function removeProduct(req, res) {
    try {
        const product = deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        clearCache();

        res.json(product);
    } catch (err) {
        res.status(500).json({
            error: "Error deleting product"
        });
    }
}


module.exports = {
    getAllProducts,
    getSingleProduct,
    addProduct,
    editProduct,
    removeProduct
};
