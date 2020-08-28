const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/employeeList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

app.use(cors());

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// initialize routes
app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/apiEntry'));

// error handling middleware
app.use(function(err, req, res, next){
    // console.log(err);
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});