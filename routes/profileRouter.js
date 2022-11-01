const express = require('express');
const passport = require('passport')


const profileRouter = express.Router();



profileRouter.post('/my-orders',
  passport.authenticate('jwt',{session:false}),
  async (req, res, next) => {
    try {

    } catch (error) {
      next(error)
    }
  })

  module.exports = profileRouter
