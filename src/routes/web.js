import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation.js";

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
  router.get("/new-user", homepageController.getNewUserPage);
  router.post("/create-new-user", homepageController.createdNewUser);

  return app.use("/", router);
};

module.exports = initAllWebRoutes;
