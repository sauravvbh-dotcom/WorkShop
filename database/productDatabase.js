const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../db.json");

function readProducts() {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function writeProducts(products) {
    try {
        fs.writeFileSync(
            filePath,
            JSON.stringify(products, null, 2)
        );
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    readProducts,
    writeProducts
};