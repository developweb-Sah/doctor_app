/**
 * We have error in :
 * Showing errors with Flash message (Node.js) | Doctor's appointment booking system - Part 5
 *
 *
 * implemented login and passportjs
 */

require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

let app = express();

//config express cookie
app.use(cookieParser("secret"));

//config express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1day
    },
  })
);

//show flash message
app.use(connectFlash());

//config body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view Engine
configViewEngine(app);

// config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
