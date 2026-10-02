const { readProducts } = require("../database/productDatabase");

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

    const product = products.find(
        (p) => p.id === Number(id)
    );

    return product;
}

module.exports = {
    getProducts,
    getProductById
};
