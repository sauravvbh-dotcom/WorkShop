const express = require("express");
const fs = require("fs");
const path = require("path");
const { cache } = require("react");
const app = express();

const filePath = path.join(__dirname, "db.json");

function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
}

async function readFiledelay() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    let products = await readFile();
    return products;
}

app.get("/products", async (req, res) => {
    try {
        let key = req.url;
        let value= cache.get(key);
        if(value){
            return res.json(value);
        }
        const data = await readFiledelay();
        cache[key] = data;
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading file" });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const data = await readFile();
        const productId = Number(req.params.id);

        const product = data.find((p) => p.id === productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading file" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});