const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isSubmitted: {
        type: Boolean,
        default: false,
      },
      isAccepted: {
        type: Boolean,
        default: false,
            
      },
      isDeclined: {
        type: Boolean,
        default: false,
       
      },
      isConfirmationPending: {
        type: Boolean,
        default: false},      
      passwordReset: {
        type: Boolean,
        default: false,
      },
      resetId: {
        type: String,
      },
    },
    {strict: false},
);
  
module.exports = user = mongoose.model('users', UserSchema);
