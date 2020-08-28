const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// get a list of all employees from the db
router.get('/employees', function(req, res, next){
    Employee.find({}).then(function(employees){
        res.send(employees);
    }).catch(next);
});

// add a new employee to the db
router.post('/employees', function(req, res, next){
    Employee.find({emailid: req.body.emailid}).then(function(employees){
        if(employees.length === 0){
            Employee.create(req.body).then(function(employee){
                res.send(employee);
            }).catch(next);
        } else {
            // console.log(employees);
            res.send({message: 'Email id is already registered'});
        }
    }).catch(next);
});

// check employee login information from the db
router.post('/employees/login', function(req, res, next){
    Employee.find({emailid: req.body.emailid, password: req.body.password}).then(function(employees){
        if(employees.length === 0){
            res.send({message: 'Username/Password is Wrong'});
        } else {
            res.send({message: 'You are now logged in'});
        }
    }).catch(next);
});

// update an existing employee in the db
router.put('/employees/:id', function(req, res, next){
    Employee.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true }).then(function(employee){
        res.send(employee);
    });
});

// delete an existing employee from the db
router.delete('/employees/:id', function(req, res, next){
    Employee.findByIdAndRemove({_id: req.params.id}).then(function(employee){
        res.send(employee);
    });
});

module.exports = router;