const express = require('express');
//const config = require('./Config/Config');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();

const user = require('./Routes/User');
const publication = require('./Routes/Publication');
const member = require('./Routes/Member');
const project = require('./Routes/Project');
const activity = require('./Routes/Activity');
const resource = require('./Routes/Resource');
// const tool = require('./Routes/Tool');
const dataset = require('./Routes/Dataset');
const requestDataset = require('./Routes/RequestDataset');
const category = require('./Routes/Category');

const port = process.env.PORT;
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.json());
app.use(cors());

app.use('/api/user', user);
app.use('/api/publication', publication);
app.use('/api/member', member);
app.use('/api/project', project);
app.use('/api/activity', activity);
app.use('/api/resource', resource);
// app.use('/api/tool', tool);
app.use('/api/dataset', dataset);
app.use('/api/request-dataset', requestDataset);
app.use('/api/category', category);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log("Database online");
});

app.listen(port, () => {
    console.log(`Server initialized at port ${port}`);
});

module.exports = app;
