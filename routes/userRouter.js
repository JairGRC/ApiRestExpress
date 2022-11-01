const express = require('express');
const UserService = require('./../services/userService')
const validatorHandler = require('./../middlewares/validator.handler')
const { CreateUserShema, UpdateUserShema, GetUserSchema } = require('./../schemas/userDTO');


const routerUser = express.Router();
const service = new UserService()

routerUser.get('/',
  async (req, res, next) => {
    try {
      const users = await service.find()
      res.json(users)
    } catch (error) {
      next(error)
    }
})

routerUser.get('/:id',
  validatorHandler(GetUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.findOne(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  })

routerUser.post('/',
 // validatorHandler(CreateUserShema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const user = await service.create(body)
      res.json(user)
    } catch (error) {
      next(error)
    }
  })

routerUser.patch('/:id',
  validatorHandler(GetUserSchema, 'params'),
  validatorHandler(UpdateUserShema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body
      const userUpdate = await service.update(id, body)
      res.json(userUpdate)
    } catch (error) {
      next(error)
    }
  })

routerUser.delete('/:id',
  validatorHandler(GetUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const userDelete = await service.delele(id)
      res.json(userDelete)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = routerUser
