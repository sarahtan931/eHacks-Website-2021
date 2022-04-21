// Creates the structure for an email MongoDB document for the 'emails' collection

const mongoose = require('mongoose');
require('mongoose-type-email');

// Describes the field, value pairs of an email document
const EmailSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
  }, 
});

module.exports = mongoose.model('Emails', EmailSchema);

