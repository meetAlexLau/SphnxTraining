let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let objectSchema = require('../models/create');

// CREATE Student

router.route('/create').post(function(req, res) {
    let object = new objectSchema(req.body);
    object.save()
        .then(object => {
            res.status(200).send('Object successfully added')
        })
        .catch(err => {
            res.status(400).send('Error adding Object');
        });
});

// READ Students
router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    objectSchema.findById(id, function(err, object) {
        res.json(object);
    });
});

router.route('/').get(function(req, res) {
    objectSchema.find(function(err, objects) {
        if(err){
            console.log(err);
        }
        else{
            res.json(objects);
        }
    });
});

router.route('/update/:id').post((req, res) => {
  objectSchema.findById(req.params.id, function(err, object) {
    if(!object)
        res.status(404).send("Error Object not found")
    else  
        object.renderText = req.params.text;
        object.renderColor = req.params.color;
        object.renderFont = req.params.font;
        object.renderFontSize = req.params.fontSize;
        object.save()
          .then(object => {
              res.json("Object has been updated")
          })
          .catch(err => {
              res.status(400).send("Error occurred when updating Object.")
          })
  })
})

// Delete Student

router.route('/delete/:id').delete((req, res) => {
  objectSchema.findByIdAndDelete(req.params.id, (err, object) =>  {
        if(err)
          res.status(404).send("Error Object could not be deleted")
        else 
          res.status(200).json({
            msg: object
          })
  })
})

module.exports = router;