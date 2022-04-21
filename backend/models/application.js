// Creates the structure for an hacker application MongoDB document for the 'application' collection

const mongoose = require('mongoose');
require('mongoose-type-email');

// Describes the field, value pairs of an email document
const ApplicationSchema = new mongoose.Schema({
  Name: String,
  Email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
  }, 
  Program: String,
  Year: String,
  School: String,
  MailingAddress: String,
  CodingExperience: Boolean,
  EntrepreneurshipInterest: Number,
  SchoolForWorkforce: Number,
  Gain: String,
  TechnicalProductOrService: String,
  DesertedIsland: String,
  ResumeLink: String,
  Skills: [String],
});

module.exports = mongoose.model('Application', ApplicationSchema);
