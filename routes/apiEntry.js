const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);    // accept a file
    } else {
        cb(null, false);    // reject a file
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
// const upload = multer({dest: 'uploads/'});

// get a list of all entries from the db
router.get('/entries', function(req, res, next){
    Entry.find({}).then(function(entries){
        res.send(entries);
    }).catch(next);
});

// get an entry based on id from the db
router.get(['/entries/:id', '/courses/:id'], function(req, res, next){
    Entry.findById({_id: req.params.id}).then(function(entry){
        res.send(entry);
    }).catch(next);
});

// add a new entry to the db
router.post('/entries', upload.single('entryImage'), function(req, res, next){
    console.log(req.file);
    const entry = new Entry({
        title: req.body.title,
        short_descrip: req.body.short_descrip,
        full_descrip: req.body.full_descrip,
        image: req.file.originalname,
        author: req.body.author,
        enteredDate: req.body.enteredDate,
        isActive: req.body.isActive,
        message: req.body.message
    });

    Entry.find({title: req.body.title}).then(function(entries){
        if(entries.length === 0){
            entry.save().then(function(entry){
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

// update an existing entry image in the db
router.put('/entries/updateImage/:id', upload.single('entryImage'), function(req, res, next){
    Entry.findByIdAndUpdate({_id: req.params.id}, {image: req.file.originalname}, { new: true }).then(function(entry){
        res.send(entry);
    }).catch(next);
});

// delete an existing entry from the db
router.delete('/entries/:id', function(req, res, next){
    Entry.findByIdAndRemove({_id: req.params.id}).then(function(entry){
        res.send(entry);
    });
});

module.exports = router;