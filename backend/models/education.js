const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    applicantId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    school_name:{
        type: String,
        required: true,
    },
    level:{
        type:String,
        required: true
    },
    field_of_study:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:false
    },
    fromDate: { // This creates a field named 'fromDate'
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            return value < new Date(); // Validation for 'fromDate' to be in the past
          },
          message: 'From date must be in the past.'
        }
      },
      toDate: { // This creates a field named 'toDate'
        type: Date,
        validate: {
          validator: function (value) {
            return value > this.fromDate; // Validation for 'toDate' to be after 'fromDate'
          },
          message: 'To date must be later than from date.'
        }
      }
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;



