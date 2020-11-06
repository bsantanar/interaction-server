const express = require('express');
const config = require('./Config/Config');
const cors = require('cors');
const app = express();

const products = require('./Routes/product');

const port = process.env.PORT || config.PORT;

app.use(cors());

app.use('/api/products', products);


app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});

module.exports = app;