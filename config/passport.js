const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
mongoose.model('Users');
passport.use(new LocalStrategy(
    function(username, password, done) {nod;
      User.findOne({ email: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, true, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, true, { message: 'Incorrect password.' });
        }
        return done(null, true);
      });
    }
  ));
