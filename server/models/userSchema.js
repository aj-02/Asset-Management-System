const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmation: {
    type: String,
    enum: ['Yes','No'],
    default: 'No'
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// userSchema.methods.generateAuthToken = async function () {
//   try{
//     let token = jwt.sign({email:this.email}, process.env.SECRET_KEY);
//     this.token = this.tokens.concat({token:token});
//     await this.save();
//     return token;
//   }catch(e) {
//     console.log(e);
//   }
// }

const User = mongoose.model('USER', userSchema);
module.exports = User;