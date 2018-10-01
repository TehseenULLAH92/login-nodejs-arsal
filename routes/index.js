var express = require('express');
var router = express.Router();
const authorized = require('../middleware/authorized')
let User = require('../models/user');
router.get('*', authorized, function(req,res,next){
  res.locals.user = req.user || null;
  next();
});

router.get('/', authorized, function (req, res) {
  res.render('dashboard',{ message : ('Welcome to dashboard'), title:('Admin | Dashboard')})
})
router.get('/dashboard', authorized, function (req, res) {
  res.render('dashboard',{ message : ('Welcome to dashboard'), title:('Admin | Dashboard')})
})
router.get('/users', (req, res) => {
  User.find({}, function(err, Users){
    if (err)
        return done(err);
    if (Users) {
      res.render('users', {
        usersArray: Users,
        message: req.flash('message'),
        title: ('List All Users'),
      });
    }
  });
});
/* DELETE User BY ID */
router.get('/delete/:id', function(req, res) {
 User.findByIdAndRemove(req.params.id, function (err, project) {
   if (err) {
     req.flash('errorMsg', 'User not deleted successfully.');
     res.redirect('/index/users');
   } else {
     req.flash('successMsg', 'User deleted successfully.');
     res.redirect('/index/users');
   }
 });
});
module.exports = router;
