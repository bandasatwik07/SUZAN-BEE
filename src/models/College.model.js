const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const collegeSchema = new Schema({
  college_name: {
    type: String,
    required: true,
    unique: true,
  },
  street_name: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email_domain: {
    type: String,
    required: true,
    unique: true,
  },
  college_logo: {
    type: String,
    // required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

exports.College = mongoose.model("College", collegeSchema);
