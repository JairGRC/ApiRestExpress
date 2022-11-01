const Joi = require ('joi')
const id = Joi.number().integer();
const name = Joi.string().min(3).max(15)
const price = Joi.number()
const description = Joi.string().max(255)
const image = Joi.string().uri()
const categoryId= Joi.number().integer()
const limit = Joi.number().integer();
const ofsset = Joi.number().integer();
const createProductDTO = Joi.object({
  name:name.required(),
  price : price.required(),
  image: image.required(),
  description:description.required(),
  categoryId:categoryId.required()
})

const updateProductDTO = Joi.object({
  name:name,
  price : price,
  image:image,
  description:description,
  categoryId:categoryId
})

const getProductDTO = Joi.object({
  id:id.required()
})

const PaginationProductoDTO = Joi.object({
  limit:limit,
  ofsset:ofsset
})

module.exports = {createProductDTO,updateProductDTO,getProductDTO,PaginationProductoDTO}

