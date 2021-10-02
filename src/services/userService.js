import db from "../models";
import bcrypt from "bcryptjs";

/**var bcrypt = require('bcryptjs');
// Store hash in your password DB. */

const salt = 10;

let createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check user's email is exist before ?
      //return true if the email already exist in the db
      let isEmailExist = await checkEmailUser(user);
      if (isEmailExist) {
        resolve(
          `This email ${user.email} has already exist. Please choose another email`
        );
      } else {
        //hash the user's password
        let salt = bcrypt.genSaltSync(10);

        let hashPassword = bcrypt.hashSync(user.password, salt);
        // update the user's password
        user.password = await bcrypt.hashSync(user.password, salt);

        //create  new user

        await db.User.create(user);
        resolve("done!");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkEmailUser = (userCheck) => {
  return new Promise(async (resolve, reject) => {
    try {
      let currentUser = await db.User.findOne({
        where: {
          email: userCheck.email,
        },
      });

      if (currentUser) resolve(true);
      resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
