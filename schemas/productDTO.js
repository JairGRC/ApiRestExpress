const Joi = require ('joi')
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15)
const price = Joi.number().integer().min(10)

const createProductDTO = Joi.object({
  name:name.required(),
  price : price.required()
})

const updateProductDTO = Joi.object({
  name:name,
  price : price
})

const getProductDTO = Joi.object({
  id:id.required()
})

module.exports = {createProductDTO,updateProductDTO,getProductDTO}

