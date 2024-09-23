const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now},
    tokens: [{ token: String }]
});
  
UserSchema.methods.generateAuthToken = async function () {
    try {
      // Generate the token
      const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Save the token to the user document (assuming it's a single string, not an array)
      this.token = token;
      
      // Save the updated user document
      this.tokens = this.tokens.concat({ token });
      await this.save();
      return token;
    } catch (err) {
      console.error('Error generating auth token:', err.message);
      throw new Error('Internal server error while generating auth token');
    }
  };

  UserSchema.pre("save", async function(next) {
    // console.log(`this is your ${this.password}`);
    if(this.isModified("password")){
    this.password= await bcrypt.hash(this.password,10);
    }
    next();
})
  

module.exports = mongoose.model('User', UserSchema);