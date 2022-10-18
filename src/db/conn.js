const mongoose = require('mongoose');
const validate = require("validator")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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
  },
  tokens:[{
    token:{
      type:String
    }
  }]
  });
  // token ganerate
kittySchema.methods.tokenG = async function(){
  try{
    const newToken = jwt.sign({id:this._id.toString()},"kajfdlk903u4jkhdakjd0fskdf",{expiresIn: "2 minutes"});
    this.tokens = this.tokens.concat({token:newToken})
    await this.save();
    console.log("Token ganerate")
  }catch(err){
    console.log("Token not ganerate")
  }
}

  // password bcrypt
  kittySchema.pre("save", async function(next){
    if(this.isModified){
      this.pass = await bcrypt.hash(this.pass ,8);
      // this.Repass = await bcrypt.hash(this.Repass ,8);
    // this.Repass = undefined;
    next();
    }
  })

const friend_family = mongoose.model('friend_family', kittySchema);
module.exports = friend_family;