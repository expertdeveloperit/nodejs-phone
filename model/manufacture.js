const mongoose = require('mongoose');

const manufactureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [50, 'name cannot exceede more than 50 characters']
  }
})


module.exports = mongoose.model('manufacturer', manufactureSchema);