const Joi = require ('joi')
const id = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().min(5)

const CreateUserShema = Joi.object({
  email:email.required(),
  password:password.required(),
  role:role.required()
})

const UpdateUserShema = Joi.object({
  email:email,
  role:role
})
const GetUserSchema = Joi.object({
  id:id.required()
})


module.exports = {CreateUserShema,  UpdateUserShema, GetUserSchema}
