const mongoose = require('mongoose');

// Define the schema
const clothesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  colors: [{
    code: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }]
});

// Create a model based on the schema
const Clothes = mongoose.model('clothes', clothesSchema);

module.exports = Clothes;
