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

module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createdNewUser: createdNewUser,
};
