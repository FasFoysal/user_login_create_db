const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
require("./db/conn");
const friend_family = require("./db/conn");

const port = process.env.PORT || 80;

app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use("/bg", express.static(path.join(__dirname, "/../views/bg")));
app.use("/style", express.static(path.join(__dirname, "/../views/style")));

const title = "Wolcome to under world";
const succ = " Ragister successfull plz login";
const psssNotMatch = "password not match";
const alredyUse ="User name is already use try again or Possibly your email is already use";
const UserPassNotMatch = "Email Username or Password not match try again";
const invalidUser = "User invalid plz creat account first";

app.get("/", (req, res) => {
  res.status(200).render("home", { title: title, message: "Wellcome to pug" });
});
app.get("/ragistration", (req, res) => {
  res.status(200).render("ragistration");
});
app.post("/ragistration", async (req, res) => {
  try {
    const pass = req.body.pass;
    const rePass = req.body.Repass;
    if (pass === rePass) {
      const silence = new friend_family(req.body);

      // token ganerate
      // const tokenLog = await silence.tokenGanerate();

      await silence.save();
      console.log(silence);
      res.status(200).render("ragistration", { succ: succ });
    } else {
      res.status(200).render("ragistration", { psssNotMatch: psssNotMatch });
    }
  } catch (err) {
    res.render("ragistration", { alredyUse: alredyUse });
    console.log(err);
  }
});
app.get("/login", (req, res) => {
  res.status(200).render("login");
});
app.get('/fas', async (req,res) =>{
  res.status(200).render('fas');
})
app.post('/fas', async (req,res) =>{
  try {
    const userMail = req.body.userName;
    const userN = req.body.userName;
    const pass = req.body.pass;
    const dbUserMail = await friend_family.findOne({$or: [{ email: userMail }, { userName: userN }]});
    // password crack
    const pasBcryptCrack = await bcrypt.compare(pass,dbUserMail.pass)
    console.log("password match: "+pasBcryptCrack)
    ;

     if(pasBcryptCrack){
      // token ganerate
      const tokenLog = await dbUserMail.tokenGanerate()
      res.render('fas',{user:dbUserMail.fulName,mail:dbUserMail.email,phone:dbUserMail.phoneN,pass:dbUserMail.pass})   
    } else {
      res.status(200).render("login", { UserPassNotMatch: UserPassNotMatch });
    }
  } catch (err) {
    res.status(200).render("login", { invalidUser: invalidUser });
    console.log("invalid user")
  }
})

app.listen(port, () => {
  console.log(`App run port in http://${port}`);
});
