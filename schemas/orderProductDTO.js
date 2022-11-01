const Joi = require ('joi')
const id = Joi.number().integer()
const orderId= Joi.number().integer()
const productId= Joi.number().integer()
const amount= Joi.number()

const CreateOrderSchema = Joi.object(
  {
    orderId:orderId.required(),
    productId:productId.required(),
    amount:amount.required()
  }
)

module.exports ={CreateOrderSchema}
