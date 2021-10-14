import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation.js";
import initPassportLocal from "../controllers/passport/passportLocal";
import passport from "passport";

// init passport -local
initPassportLocal();

/*
init all web routes
 */

let router = express.Router();

let initAllWebRoutes = (app) => {
  router.get("/", homepageController.getHomepage);
  router.get("/register", homepageController.getRegisterPage);
  router.get("/login", homepageController.getLoginPage);

  router.post(
    "/register",
    auth.validateRegister,
    homepageController.handleRegister
  );
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      successFlash: true,
      failureFlash: true,
    })
  );

  router.get("/new-user", homepageController.getNewUserPage);
  router.post("/create-new-user", homepageController.createdNewUser);

  return app.use("/", router);
};

module.exports = initAllWebRoutes;
