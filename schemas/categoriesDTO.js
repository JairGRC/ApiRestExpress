
const Joi = require ('joi')
const name = Joi.string().max(255)
const image = Joi.string().uri()
const id = Joi.number().integer()

const CreateCategorySchema = Joi.object({
  name:name.required(),
  image:image.required()
})
const UpdateCategorySchema= Joi.object({
  name: name,
  image:image
})
const getCategorySchema = Joi.object({
  id:id.required()
})

module.exports = {CreateCategorySchema,  UpdateCategorySchema,  getCategorySchema}
