const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
require('../strategy/passport')(passport);
const User = require('../models/user.js');

// Config dotenv
dotenv.config();

// Create new endpoint route 
const router = new express.Router();

// Return account information 
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  User.findOne({email: req.query.email}, function(err, user) {
    if (err) {
      res.status(400).send(err);
      console.log(err);
    } else {
      const newUser = {
        email: user.email,
        isAccepted: user.isAccepted,
        isDeclined: user.isDeclined,
        isSubmitted: user.isSubmitted,
        isConfirmationPending: user.isConfirmationPending,
        name: user.name.split(' ')[0],
      };

      res.send(newUser);
    }
  });
});

// Export module
module.exports = router;
