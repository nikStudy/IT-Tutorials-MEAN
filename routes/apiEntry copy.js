const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

// get a list of all entries from the db
router.get('/entries', function(req, res, next){
    Entry.find({}).then(function(entries){
        res.send(entries);
    }).catch(next);
});

// add a new entry to the db
router.post('/entries', function(req, res, next){
    Entry.find({title: req.body.title}).then(function(entries){
        if(entries.length === 0){
            Entry.create(req.body).then(function(entry){
                res.send(entry);
            }).catch(next);
        } else {
            // console.log(entries);
            res.send({message: 'Entry with the same title is already present'});
        }
    }).catch(next);
});

// update an existing entry in the db
router.put('/entries/:id', function(req, res, next){
    Entry.findByIdAndUpdate({_id: req.params.id}, req.body, { new: true }).then(function(entry){
        res.send(entry);
    });
});

// delete an existing entry from the db
router.delete('/entries/:id', function(req, res, next){
    Entry.findByIdAndRemove({_id: req.params.id}).then(function(entry){
        res.send(entry);
    });
});

module.exports = router;