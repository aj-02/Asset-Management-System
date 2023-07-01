const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    assetClass: {
    type: String,
    required: true
  },
  modelNumber: {
    type: String,
    required: true
  },
  manufactureDate: {
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true
  },
  confirmation: {
    type: String,
    enum: ['Yes', 'No']
  }
});

const Asset = mongoose.model('ASSET', assetSchema);
module.exports = Asset;