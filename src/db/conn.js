require('dotenv').config();
const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

main()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Databae not connected" ));

async function main() {
await mongoose.connect(process.env.MONGO_HOST);
}

const kittySchema = new mongoose.Schema({
   
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  fulName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(val) {
      if (!validate.isEmail(val)) {
        throw new console.error("Email not valid");
      }
    },
  },
  phoneN: Number,
  pass: {
    type: String,
    required: true,
  },
  Repass: {
    type: String,
  }
 
});
kittySchema.methods.tokenGanerate = async function(){
  try{
    const newToken = jwt.sign({_id:this._id
    },process.env.SECRET_KEY,);
    // this.tokens = this.tokens.concat({token:newToken})
    // id:this._id.toString()
    // this.token = newToken;
   return newToken;
    // await this.save();
  }catch(err){
    console.log(err)}}

// password bcrypt
kittySchema.pre("save", async function(next) {
  if (this.isModified) {
    const salt = await bcrypt.genSaltSync(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    // hashSync
    this.Repass = undefined;
    next();
  }
});

const friend_family = mongoose.model("friend_family", kittySchema);
module.exports = friend_family;
