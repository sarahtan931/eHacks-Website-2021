const passport = require('passport');
const login = require('../strategy/login.js');
require('../strategy/passport')(passport);
const utils = require('../strategy/utils.js');
const express = require('express');
const Joi = require('joi-plus');
const router = new express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/user.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../.env')});


const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

const validEmail = Joi.string().max(256).min(1).email();
const validPass = Joi.string().max(100).min(6).trim().escape();


// login
router.post('/', (req, res, next) => {
  error1 = validEmail.validate(req.body.email, {escapeHTML: true});
  error2 = validPass.validate(req.body.password, {escapeHTML: true});

  if (error1.error != null || error2.error != null) {
    res.status(401).send('Invalid input');
  } else {
    login.authenticate('login', function(err, user, info) {
      if (err) {
        res.status(400).send('Login failed');
      } else if (!user) {
        res.status(400).send('Login failed');
      } else {
        const jwt = utils.issueJWT(user);
        res.status(200).send({success: `Logged in ${user.email}`, token: jwt.token, expiresIn: jwt.expires, email: user.email});
      }
    })(req, res, next);
  }
});

router.post('/forgot', (req, res, next) => {
  // 1) Check if the email is in the system. If so, set it to be resettable
  const id = crypto.randomBytes(20).toString('hex');
  const link = `${process.env.REACT_APP_URL}/reset/` + req.body.email + '/' + id;

  const mailData = {
    from: 'noreply@ehacks.ca', // sender address
    to: req.body.email, // list of receivers
    subject: 'eHacks: Reset Password Request',
    text: 'Hey there! It looks like you forgot your password. We can help: get started by visiting this link: ' +
        `${link} . We look forward to seeing you back in our Hacker Portal! Cheers, eHacks`,
    html: 'Hey there!<br><br> It looks like you forgot your password. We can help: get started by visiting this link: <br><br>' +
        `<a href="${link}">${link}</a> <br><br> We look forward to seeing you back in our Hacker Portal! <br><br> Cheers, <br> eHacks` +
        '<br> <br> Was this request not made by you? Please email us at ehacksevents@gmail.com so we can investigate further.',
  };


  User.findOne({email: req.body.email})
      .then((user) => {
        if (user == null) {
          // The user does not exist, but we cannot let the user know that for security reasons.
          res.status(200).send('Success!');
        } else {
          // 2) The user exists, so we need to set it to be resettable.
          transporter.sendMail(mailData, (err) => {
            if (err) {
              console.log(err);
              return res.status(500).send('Something went wrong');
            } else {
              User.updateOne({email: req.body.email}, {passwordReset: true, resetId: id})
                  .then((user) => {
                    return res.status(200).send('Success!');
                  })
                  .catch((err) => {
                    return res.status(500).send('Something went wrong');
                  });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Something went wrong');
      });
});

router.post('/reset', (req, res, next) => {
  User.findOne({email: req.body.email})
      .then((user) => {
        if (!user || !user.passwordReset || !user.resetId || user.passwordReset === false || user.resetId !== req.body.id) {
          res.status(500).send('Something went wrong');
          return;
        }

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            User.updateOne({email: req.body.email}, {password: hash, passwordReset: false, resetId: ''})
                .then((user) => {
                  if (user) {
                    return res.status(200).send('Success!');
                  }

                  res.status(500).send('Something went wrong');
                })
                .catch((err) => {
                  res.status(500).send('Something went wrong');
                });
          });
        });
      })
      .catch((err) => {
        res.status(500).send('Something went wrong');
      });
});

module.exports = router;
