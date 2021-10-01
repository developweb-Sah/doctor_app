import db from "../models";

let createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create(user);
      resolve("done!");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
};
