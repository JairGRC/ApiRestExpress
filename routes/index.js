const express = require('express')
const productsRouter = require('./productsRouter')
const userRouter = require('./userRouter')
const routerCategories = require ('./categoriesRouter')


function routerApi(app) {
  //Versiones para rutas
  const router = express.Router();
  app.use('/api/v1',router)
  
  router.use('/products', productsRouter)
  router.use('/users',userRouter)
  router.use('/categories',routerCategories)
}

module.exports = routerApi
