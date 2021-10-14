import db from "../models";
import bcrypt from "bcryptjs";

let findUserByEmail = (emailInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: emailInput,
        },
      });
      if (!user) {
        reject(`We cannot find a user with the email "${emailInput}" `);
      }
      resolve(user);
    } catch (error) {
      reject(e);
    }
  });
};

let comparePassword = (password, userObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isMatch = await bcrypt.compare(password, userObject.password);
      if (isMatch) resolve(true);
      else {
        resolve("The password that you've entered is incorrect!");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let findUserById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: idInput,
        },
      });
      if (!user) reject(`User not Found by the id: ${idInput}`);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  findUserByEmail: findUserByEmail,
  comparePassword: comparePassword,
  findUserById: findUserById,
};
