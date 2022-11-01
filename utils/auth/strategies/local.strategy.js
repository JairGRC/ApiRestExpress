const { Strategy } = require('passport-local')
const UserService = require('./../../../services/userService')
const service = new UserService();
const bcrypt = require('bcryptjs');
const HapiBoom = require('@hapi/boom');
const LocalStrategy = new Strategy({
    usernameField : 'email',
    passwordField :'password'
}, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email)
    if (!user) {
      done(HapiBoom.unauthorized(), false)
    }
    const isMath = await bcrypt.compare(password, user.password)
    if (!isMath) {
      done(HapiBoom.unauthorized(), false)
    }
    delete user["password"]
    done(null, user)
  } catch (error) {
    done(error, false)
  }

});

module.exports = LocalStrategy
