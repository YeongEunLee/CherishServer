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
        },
      });
      return alreadyEmail;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  signin: async ({
    email,
    password
  }) => {
    try {
      const user = await User.findOne({
        where: {
          email,
          password,
        },
      });
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  signup: async (name, email, password, sex, nickname, phone, birth) => {
    try {
      //const salt = crypto.randomBytes(64).toString('base64');
      //const saltPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
      const user = await User.create({
        name,
        email,
        password,
        sex,
        nickname,
        salt: '4321234',
        phone,
        birth
      });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};