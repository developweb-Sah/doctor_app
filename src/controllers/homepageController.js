import userService from "../services/userService";
import { validationResult } from "express-validator";

let getHomepage = (req, res) => {
  return res.render("homepage.ejs");
};
let getNewUserPage = (req, res) => {
  return res.render("createUser.ejs");
};
let createdNewUser = async (req, res) => {
  let user = req.body;
  let message = await userService.createNewUser(user);
  console.log(message);
  return res.redirect("/");
};
let getRegisterPage = (req, res) => {
  let form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  return res.render("auth/register.ejs", {
    errors: req.flash("errors"),
    form: form,
  });
};
let getLoginPage = (req, res) => {
  return res.render("auth/login.ejs", {
    errors: req.flash("error"),
  });
};
let handleRegister = async (req, res) => {
  //keep the old input value
  let form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  //validate input fields
  //create an empty array to save validation errors
  let errorsArr = [];
  let validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    let errors = Object.values(validationError.mapped());
    // console.log(errors);
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("errors", errorsArr);
    return res.render("auth/register.ejs", {
      form: form,
    });
  }

  //create a new user
  try {
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      createdAt: Date.now(),
    };
    // console.log(req.body);
    // let message =
    await userService.createNewUser(user);
    // console.log(message);
    return res.redirect("/");
  } catch (err) {
    //showing the error message with Flash
    req.flash("errors", err);
    return res.redirect("/register", form);
  }
};

// let handleLogin = (req, res) => {
//   let user = {
//     email: req.body,
//     password: req.body.password,
//   };
//   console.log(user);
// };

module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createdNewUser: createdNewUser,
  getRegisterPage: getRegisterPage,
  getLoginPage: getLoginPage,
  handleRegister: handleRegister,
  // handleLogin: handleLogin,
};
