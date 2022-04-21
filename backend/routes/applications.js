// In ../index.js, whenever the endpoint begins with "/application/(rest of endpoint)"
// the /(rest of endpoint) portion of the endpoint is handled here
const express = require('express');
const router = new express.Router();
const Application = require('../models/application');
const Users = require('../models/user');
const passport = require('passport');
require('../strategy/passport')(passport);
const nodemailer = require('nodemailer');

const Joi = require('joi-plus');
const sanitizeHtml = require('sanitize-html');
const validStringShort = Joi.string().max(2000).min(0).trim().sanitize(sanitizeHtml);
const validString = Joi.string().max(5000).min(0).trim().sanitize(sanitizeHtml);
const validStringLong = Joi.string().max(10000).min(0).trim().sanitize(sanitizeHtml);
const validParagraph = Joi.string().max(20000).min(0).trim().sanitize(sanitizeHtml);
const validBoolean = Joi.boolean();
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../.env')});


// SMTP connection to google mail service
// Link to noreply email 
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

// When a POST request is made to endpoint '/applications', this function takes the JSON, which is a new application,
// passed into it as a parameter, saves it into the database, and then returns the JSON result of saving it
// into the database
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const application = new Application({
    Name: req.body.Name,
    Email: req.body.Email,
    Program: req.body.Program,
    Year: req.body.Year,
    MailingAddress: req.body.MailingAddress,
    CodingExperience: null,
    EntrepreneurshipInterest: null,
    SchoolForWorkforce: null,
    Gain: null,
    TechnicalProductOrService: null,
    DesertedIsland: null,
    Skills: [],
  });

  application.save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({message: err});
      });
});

// page 1, Basic Info for the user
router.post('/setpage1', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errorProgram = validString.validate(req.body.program, {escapeHTML: true});
  const errorYear = validStringShort.validate(req.body.year, {escapeHTML: true});
  const errorMailingAddress = validStringLong.validate(req.body.address, {escapeHTML: true});
  const errorSchool = validString.validate(req.body.school, {escapeHTML: true});

  if (errorSchool.error != null || errorMailingAddress.error != null || errorProgram.error != null || errorYear.error != null) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send();
  } else {
    const update = {
      Email: req.body.email,
      Program: req.body.program,
      Year: req.body.year,
      MailingAddress: req.body.address,
      School: req.body.school,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpage1/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        name: '',
        year: '',
        school: '', 
        program: '', 
        address: ''};
      if (data == null) {
        res.send(arr);
      } else {
        if (data['Name'] != undefined && data['Name'] != null) {
          arr['name'] = data.Name;
        }
        if (data['Year'] != undefined && data['Year'] != null) {
          arr['year'] = data.Year;
        }
        if (data['School'] != undefined && data['School'] != null) {
          arr['school'] = data.School;
        }
        if (data['Program'] != undefined && data['Program'] != null) {
          arr['program'] = data.Program;
        }
        if (data['MailingAddress'] != undefined && data['MailingAddress'] != null) {
          arr['address'] = data.MailingAddress;
        }
        res.send(arr);
      }
    }
  });
});

// page resume, the users link to their resume
router.post('/setpageresume', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errorResumeLink = validStringLong.validate(req.body.resumelink, {escapeHTML: true});
  if (errorResumeLink.error != null) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send('Invalid input');
  } else {
    const update = {
      ResumeLink: req.body.resumelink,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpageresume/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        resumelink: 0,
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['ResumeLink'] != null || data['ResumeLink'] != undefined) {
          arr['resumelink'] = data.ResumeLink;
        }
        res.send(arr);
      }
    }
  });
});

// page 2, a boolean if the user have previous coding experience
router.post('/setpage2', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errorCodingExperience = validBoolean.validate(req.body.codingExperience, {escapeHTML: true});
  if (errorCodingExperience.error != null) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send('Invalid input');
  } else {
    const update = {
      CodingExperience: req.body.codingExperience,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpage2/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        codingExperience: 0,
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['CodingExperience'] != null || data['CodingExperience'] != undefined) {
          arr['codingExperience'] = data.CodingExperience;
        }
        res.send(arr);
      }
    }
  });
});

// page 3, The users entrepreneur interest on a scale of 1-5 
router.post('/setpage3', passport.authenticate('jwt', {session: false}), (req, res) => {
  const update = {
    EntrepreneurshipInterest: req.body.eInterest,
  };
  Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/getpage3/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        eInterest: '',
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['EntrepreneurshipInterest'] != null || data['EntrepreneurshipInterest'] != undefined) {
          arr['eInterest'] = data.EntrepreneurshipInterest;
        }
        res.send(arr);
      }
    }
  });
});

// page 4, how well school has prepared the user for the workforce
router.post('/setpage4', passport.authenticate('jwt', {session: false}), (req, res) => {
  const update = {
    SchoolForWorkforce: req.body.prepare,
  };
  Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get('/getpage4/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        prepare: '',
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['SchoolForWorkforce'] != undefined && data['SchoolForWorkforce'] != null) {
          arr['prepare'] = data.SchoolForWorkforce;
        }
        res.send(arr);
      }
    }
  });
});

// page 5, a paragraph of what the user want to gain from this expereince
router.post('/setpage5', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errorGain = validParagraph.validate(req.body.gain, {escapeHTML: true});
  if (errorGain.error != null) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send('Invalid input');
  } else {
    const update = {
      Gain: req.body.gain,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpage5/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        gain: '',
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['Gain'] !== undefined && data['Gain'] != null) {
          arr['gain'] = data.Gain;
        }
        res.send(arr);
      }
    }
  });
});

// question 6, a paragraph about a technical interest 
router.post('/setpage6', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errorInterest = validParagraph.validate(req.body.interest, {escapeHTML: true});
  if (errorInterest.error != null) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send('Invalid input');
  } else {
    const update = {
      TechnicalProductOrService: req.body.interest,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpage6/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        interest: '',
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['TechnicalProductOrService'] != undefined && data['TechnicalProductOrService'] != null) {
          arr['interest'] = data.TechnicalProductOrService;
        }
        res.send(arr);
      }
    }
  });
});

// question 7
router.post('/setpage7', (req, res) => {
  const errorIsland = validParagraph.validate(req.body.island, {escapeHTML: true});
  if (errorIsland.error != null) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send('Invalid input');
  } else {
    const update = {
      DesertedIsland: req.body.island,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpage7/:email', (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        island: '',
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['DesertedIsland'] != undefined && data['DesertedIsland'] != null) {
          arr['island'] = data.DesertedIsland;
        }
        res.send(arr);
      }
    }
  });
});

// submit/save skills
router.post('/setpageskills', passport.authenticate('jwt', {session: false}), (req, res) => {
  let error = false;
  const skillnames = req.body.skills.map(function(a) {
    return a.name;
  });
  for (const skill of skillnames) {
    const errorSkills = validParagraph.validate(skill, {escapeHTML: true});
    if (errorSkills.error != null) {
      error = true;
    }
  }
  if (error) {
    res.statusMessage = 'Error Saving! Enter a Valid Input';
    res.status(400).send('Invalid input');
  } else {
    const update = {
      Skills: skillnames,
    };
    Application.findOneAndUpdate({Email: req.body.email}, update, {new: true, upsert: true, useFindAndModify: false}, function(err, data) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

router.get('/getpageskills/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      const arr = {
        skills: 0,
      };
      if (data == null) {
        res.send(arr);
      } else {
        if (data['Skills'] != null || data['Skills'] != undefined) {
          arr['skills'] = data.Skills;
        }
        res.send(arr);
      }
    }
  });
});

router.get('/review/:email', passport.authenticate('jwt', {session: false}), (req, res) => {
  Application.findOne({Email: req.params.email}, function(err, data) {
    Users.findOne({email: req.params.email}, function(err, user) {
      if (err) {
        res.status(400).send(err);
      } else {
        result = {
          name: user.name,
          application: data,
        };
        res.send(result);
      }
    });
  });
});

// submit/save skills
router.post('/submit', passport.authenticate('jwt', {session: false}), (req, res) => {
  const update = {
    isSubmitted: true,
  };
  Users.findOneAndUpdate({email: req.body.email}, update, {useFindAndModify: false}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      // Send email to user
      // Send confirmation email to user
      const mailData = {
        from: 'noreply@ehacks.ca', // sender address
        to: req.body.email, // list of receivers
        subject: 'eHacks Application Submitted!',
        text: 'Yay! Your eHacks Application is submitted and will be reviewed shortly. Visit ehacks.ca for updates',
        html: `Hey ${data.name},<br><br> Your eHacks application has been successfully submitted. Thank you for spending the time to apply and for your interest in eHacks - it's going to be a blast! Hang tight for an update from our team. ` +
            `In the meantime, feel free to visit <a href="https://ehacks.ca">ehacks.ca</a> to view your application status, learn more about our event, or submit a question to the team. ` +
            '<br> <br> If you have any questions, please email us at <a href="mailto:ehacksevents@gmail.com">ehacksevents@gmail.com</a> and we will get back to you as soon as possible. ' +
            `Thanks again and we look forward to connecting soon! <br> <br> Sincerely, <br> The eHacks Team`,
      };

      transporter.sendMail(mailData, (err)=>{
        if (err) {
          console.log(err);
          return res.status(500).send('Something went wrong');
        } else {
          console.log('Successfully sent email');
        }
      });

      res.status(200).send(data);
    }
  });
});

router.put('/:id', function(req, res, next) {
  Application.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    Application.findOne({_id: req.params.id}).then(function(ninja) {
      res.send(application);
    });
  });
});

// allows the router to be used in '../index.js'
module.exports = router;
