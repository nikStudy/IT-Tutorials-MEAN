const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create employee Schema
const EmployeeSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname field is required']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname field is required']
    },
    emailid: {
        type: String,
        required: [true, 'Email id field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    message: {
        type: String,
        default: 'New Record Created'
    }
});

// create employee model
const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;