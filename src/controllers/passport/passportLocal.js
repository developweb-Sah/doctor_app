import passport from "passport";
import passportLocal from "passport-local";
import loginServices from "../../services/loginService";

let LocalStrategy = passportLocal.Strategy;

//init the password local
let initPassportLocal = () => {
  // check login with email and password input
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passportField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // find user by the email address
          await loginServices
            .findUserByEmail(email)
            // had a user ?
            .then(async (user) => {
              if (!user)
                return done(null, false, req.flash("errors", "User not found"));
              // Compare the user's password
              let message = await loginServices.comparePassword(password, user);
              //   the password is match?
              if (message === true) {
                return done(null, user, null);
              } else {
                // return false with the error message
                return done(null, false, req.flash("error", message));
              }
            })
            .catch((err) => {
              console.log(err);
              return done(null, false, message);
            });
        } catch (error) {
          console.log(error);
          return done(null, false, error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  loginService
    .findUserById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      console.log(error);
      return done(error, null);
    });
});
module.exports = initPassportLocal;
