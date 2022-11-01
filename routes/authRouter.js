const express = require('express');
const jwt = require('jsonwebtoken')

const AuthCategories = express.Router();
const passport = require ('passport')
const {config} = require('./../configsss/configss')

AuthCategories.post('/login',
  passport.authenticate('local',{session:false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload,config.jwtSecret)
      res.json({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  })


module.exports = AuthCategories
