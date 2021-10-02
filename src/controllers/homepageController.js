import userService from "../services/userService";

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
  return res.render("auth/register.ejs");
};
let getLoginPage = (req, res) => {
  return res.render("auth/login.ejs");
};
let handleRegister = async (req, res) => {
  //validate input fields

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
    let message = await userService.createNewUser(user);
    console.log(message);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createdNewUser: createdNewUser,
  getRegisterPage: getRegisterPage,
  getLoginPage: getLoginPage,
  handleRegister: handleRegister,
};
