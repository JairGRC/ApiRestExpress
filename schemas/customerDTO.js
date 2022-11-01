const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const lastName = Joi.string()
const phone = Joi.string().min(9)
const userId = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string()

const getCustomerChema = Joi.object({
  id: id.required()
})
const createCustomerShema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  User: Joi.object({
    create: Joi.object(
      {
        email: email.required(),
        password: password.required()
      }
    )
  }
  ).required()
})


const updateCustomerShema = Joi.object({
  name,
  lastName,
  phone
})

module.exports = { getCustomerChema, createCustomerShema, updateCustomerShema }

