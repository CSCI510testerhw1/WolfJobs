const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    applicantId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    organization:{
        type: String,
        required: true,
    },
    role:{
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

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;



