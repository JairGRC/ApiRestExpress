const express = require('express');
const passport = require ('passport')
const routerCategories = express.Router();
const validatorHandler = require('./../middlewares/validator.handler')
const {checkRoles} = require('./../middlewares/auth.handler')
const CategoryService = require('./../services/categoryService')
const service = new CategoryService()
const { CreateCategorySchema, UpdateCategorySchema, getCategorySchema } = require('./../schemas/categoriesDTO');


routerCategories.get('/',
  async (req, res, next) => {
    try {
      const categories = await service.find()
      res.json(categories)
    } catch (error) {
      next(error)
    }
  })
routerCategories.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const categories = await service.FindOne(id)
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }
)
routerCategories.post('/',
  passport.authenticate('jwt',{session:false}),
  checkRoles('admin'),
  validatorHandler(CreateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const category = await service.create(body)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

routerCategories.patch('/:id',
validatorHandler(getCategorySchema,'params'),
validatorHandler(UpdateCategorySchema,'body'),
async (req,res,next)=>{
  try {
    const {id}= req.params
    const body = req.body
    const category = await service.update(id,body)
    res.json(category)
  } catch (error) {
    next(error)
  }
}
)

routerCategories.delete('/:id',
passport.authenticate('jwt',{session:false}),
checkRoles('admin','seller'),
validatorHandler(getCategorySchema,'params'),
async (req,res,next )=>{
  try {
      const {id}= req.params
      const category = await service.delete(id)
      res.json(category)
  } catch (error) {
    next(error)
  }
})

module.exports = routerCategories
