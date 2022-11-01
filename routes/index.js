const express = require('express')
const productsRouter = require('./productsRouter')
const userRouter = require('./userRouter')
const routerCategories = require ('./categoriesRouter')
const routerCustomer = require('./customerRouter')
const ordenCustomer= require('./ordenRouter')
const AuthCustomer= require('./authRouter')
function routerApi(app) {
  //Versiones para rutas
  const router = express.Router();
  app.use('/api/v1',router)

  router.use('/products', productsRouter)
  router.use('/users',userRouter)
  router.use('/categories',routerCategories)
  router.use('/customers',routerCustomer)
  router.use('/order',ordenCustomer)
  router.use('/auth',AuthCustomer)

}

module.exports = routerApi
