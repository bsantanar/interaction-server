const express = require('express');
//const config = require('./Config/Config');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const user = require('./Routes/user');
const publication = require('./Routes/Publication');
const member = require('./Routes/Member');
const project = require('./Routes/Project');

const port = process.env.PORT;
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/user', user);
app.use('/api/publication', publication);
app.use('/api/member', member);
app.use('/api/project', project);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log("Database online");
});

app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});

module.exports = app;