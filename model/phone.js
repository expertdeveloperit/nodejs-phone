const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    unique: true,
    maxlength: [100, 'name cannot exceed 100 chararcter']
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'manufacturer'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, "Job description cannot exccede 1000 characters"]
  },
  color: {
    type: String,
    required: true,
    enum: {
      values: ['black', 'white', 'blue', 'grey'],
      message: ['Please select correct option for color']
    }
  },
  price: {
    type: Number,
    required: [true, 'Please enter expected price for this']
  },
  imageFileName: {
    type: String
  },
  screen: {
    type: String,
    required: [true, "screen detail is required"]
  },
  processor: {
    type: String,
    required: [true, "processor detail is required"]
  },
  ram: {
    type: String,
    required: true,
    enum: {
      values: ['2', '4', '6', '8', '16'],
      message: ['Please select correct ram detail']
    }
  },
  postedDate: {
    type: Date,
    default: Date.now(),
  }
})


module.exports = mongoose.model('phone', phoneSchema);