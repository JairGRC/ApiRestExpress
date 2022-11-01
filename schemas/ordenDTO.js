
const Joi = require ('joi')
const id = Joi.number().integer()
const customerId= Joi.number().integer()

const createOrdenSchema = Joi.object({
  customerId:customerId.integer().required()
})
const updateOrdenSchema = Joi.object({
  customerId:customerId
})
const getOrdenSchema = Joi.object({
  id:id.required()
})

module.exports = {createOrdenSchema,updateOrdenSchema,getOrdenSchema}
