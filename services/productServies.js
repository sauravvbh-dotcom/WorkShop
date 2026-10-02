const {
    readProducts,
    writeProducts
} = require("../database/productDatabase");

async function getProducts() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return readProducts();
}

async function getProductById(id) {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    const products = readProducts();

    return products.find(
        (p) => p.id === Number(id)
    );
}

function createProduct(product) {
    const products = readProducts();

    products.push(product);

    writeProducts(products);

    return product;
}

function updateProduct(id, updatedProduct) {
    const products = readProducts();

    const index = products.findIndex(
        (p) => p.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...updatedProduct,
        id: Number(id)
    };

    writeProducts(products);

    return products[index];
}

function deleteProduct(id) {
    const products = readProducts();

    const index = products.findIndex(
        (p) => p.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    writeProducts(products);

    return deletedProduct;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};