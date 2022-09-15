const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var person;

const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next()
  } else {
    return res.redirect('/')
  }
}


// require model
const Users = require('../models/user');

// Register New Users
router.post('/register', async (req, res) => {
    try {
      const userData = new Users(req.body.user);
      const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
      userData.password = hashedPassword;
      console.log (userData);
      await userData.save();
      res.redirect('/login') }
    catch (error) {
      console.log (error)
    }
})

// Login
router.post('/login', async (req, res) => {
  console.log ("logging in");
  try {
    //const userData = new Users(req.body.user);
    const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
    const user = await Users.find({email: req.body.user.email});
      if (user.length != 1) {
        console.log("User Not Found");

        //if (hashedPassword == user[0].password) {
          //res.redirect('/dashboard')
        //}
        res.render ("login", {error: "An error occured"}); return
      } else {
      person = user[0].name;
      console.log (person);
      req.session.person = person
    }
    // console.log('testing', user);

      bcrypt.compare(req.body.user.password, user[0].password, function(error, result)
            { if (result) {req.session.isAuth = true; res.redirect('/dashboard'); return;}
      // { if (result) {req.session.isAuth = true; res.render ('dashboard', {user:person}); return;}
        else { console.log("Invalid Password"); res.render ("login", {error: "An error occured"}); return}})
    }
  catch (error) {
    console.log (error)
  }
})

module.exports = router
