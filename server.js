const express = require('express');
const app = express();

app.use(express.json());

app.get('/products', (req, res) => {
    res.send('Hello, World!');
});

app.post('/products/:id', (req, res) => {
    const product = req.body;
    res.status(201).send(`Product created: ${JSON.stringify(product)}`);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

