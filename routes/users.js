const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport = require('passport');
const crypto = require('crypto');
const bCrypt = require('bcryptjs');
const async    = require('async');
const authorized = require('../middleware/authorized');

let User = require('../models/user');
// router.get('*', authorized, function(req,res,next){
//   res.locals.user = req.user || null;
//   next();
// });
router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('message'), title: ('Register') });
});

router.post('/register', passport.authenticate('register', {
  successRedirect: '/',
  failureRedirect: '/users/register',
  failureFlash : true
}));

router.get('/login',  (req, res, next) => {
  res.render('login',  { message: req.flash('message'), title: ('Login') });
})

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash : true
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router
