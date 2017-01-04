var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('eventplanner', ['subscribers']);
var cors = require('cors');

/* GET All subscribers */
router.get('/', function(req, res, next) {
  db.subscribers.find(function(err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.set("Access-Control-Allow-Origin", "http://localhost:4200");
      res.json(todos);
    }
  });
});

/* GET One subscriber with the provided ID */
router.get('/:id', function(req, res, next) {
  db.subscriber.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, todos) {
    if (err) {
      res.send(err);
    } else {
      res.json(subscribers);
    }
  });
});

/* POST/SAVE a subscriber */
router.post('/new', function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:4200");
  var subscriber = req.body;
  if (!subscriber.name || !subscriber.email || isNaN(subscriber.missed_events)) {
    res.status(400);
    res.json({
      "error": "Invalid Data",
      "details": "Please provide at least name, email and (default) number of missed events.",
      "your_request_body": subscriber
    });
  } else {
    db.subscribers.save(subscriber, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});

/* PUT/UPDATE a subscriber */
router.put('/:id', cors(), function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:4200");
  var subscriber = req.body;
  // Remove _id from body because mongodb won't accept _id updates
  delete subscriber.$set._id;
  if (!subscriber) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    // console.log(subscriber);
    db.subscribers.update({
      _id: mongojs.ObjectId(req.params.id)
    }, subscriber, {}, function(err, result) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.json(result);
      }
    });
  }
});

/* DELETE a subscriber */
router.delete('/:id', function(req, res) {
  res.set("Access-Control-Allow-Origin", "http://localhost:4200");
  db.subscribers.remove({
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
