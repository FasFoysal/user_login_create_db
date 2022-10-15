const mongoose = require('mongoose');
const validate = require("validator")
main().then(()=>console.log("Database connected")).catch(err => console.log("Databae not connected"+err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Fas');
}

const kittySchema = new mongoose.Schema({
  userName:{
  type:String,
  required:true,
  unique:true
  },

  fulName:{
    type:String,
  required:true
  },
  email:{
    type:String,
  required:true,
  unique:true,
  validate(val){
    if(!validate.isEmail(val)){
      throw new console.error("Email not valid");
    }
  }},
  phoneN:Number,
  pass:{
    type:String,
    required:true
  },
  Repass:{
    type:String,
  required:true
  }
  });

const friend_family = mongoose.model('friend_family', kittySchema);
module.exports = friend_family;