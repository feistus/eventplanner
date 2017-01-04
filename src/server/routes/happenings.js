var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('eventplanner', ['happenings']);

/* GET All happenings */
router.get('/', function(req, res, next) {
  db.happenings.find(function(err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});

/* GET One happening with the provided ID */
router.get('/:id', function(req, res, next) {
  db.happening.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.json(happenings);
    }
  });
});

/* POST/SAVE a happening */
router.post('/new', function(req, res, next) {
  var happening = req.body;
  if (!happening.title || !happening.details || !happening.date || isNaN(happening.slots_available)) {
    res.status(400);
    res.json({
      "error": "Invalid Data",
      "details": "Please provide at least title, details and number of slots available.",
      "your_request_body": happening
    });
  } else {
    db.happenings.save(happening, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});

/* PUT/UPDATE a happening */
router.put('/:id', function(req, res, next) {
  var happening = req.body;
  if (!happening) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.happenings.update({
      _id: mongojs.ObjectId(req.params.id)
    }, happening, {}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

/* DELETE a happening */
router.delete('/:id', function(req, res) {
  db.happenings.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, '', function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
