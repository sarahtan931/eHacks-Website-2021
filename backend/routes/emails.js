// In ../index.js, whenever the endpoint begins with "/emails/(rest of endpoint)"
// the /(rest of endpoint) portion of the endpoint is handled here
const express = require('express');
const router = new express.Router();
const Email = require('../models/email');

// When a POST request is made to endpoint '/emails', this function takes the JSON, which is a new email address,
// passed into it as a parameter, saves it into the database, and then returns the JSON result of saving it
// into the database
router.post('/', (req, res) => {
  const email = new Email({
    email: req.body.email,
  });

  email.save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({message: err});
      });
});

// allows the router to be used in '../index.js'
module.exports = router;
