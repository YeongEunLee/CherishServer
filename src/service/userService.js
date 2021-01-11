const {
  User
} = require('../models');

module.exports = {
  emailCheck: async ({
    email
  }) => {
    try {
      const alreadyEmail = await User.findOne({
        where: {
          email,
        }
      });
      return alreadyEmail;
    } catch (err) {
      throw err;
    }
  },

  signin: async ({
    email,
    password,
    salt
  }) => {
    try {
      const user = await User.findOne({
        where: {
          email,
          password
        }
      });
      console.log(user);
      return user;
    } catch (err) {
      throw err;
    }
  },

  signup: async (email, password, sex, birth, nickname) => {
    try {
      //const salt = crypto.randomBytes(64).toString('base64');
      //const saltPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        email,
        password,
        sex,
        birth,
        nickname,
        salt: "4321234",
        phone: "010-0000-0000",
        name: "한두두"
      });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}