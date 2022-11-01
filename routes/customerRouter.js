
const express = require('express');
const CustomerService = require('./../services/customerService')
const validatorHandler = require('./../middlewares/validator.handler')
const { createCustomerShema, getCustomerChema, updateCustomerShema } = require('./../schemas/customerDTO');


const routerCustomer = express.Router();
const service = new CustomerService()

routerCustomer.get('/',
  async (req, res, next) => {
    try {
      const customer = await service.find()
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

routerCustomer.get('/:id',
  validatorHandler(getCustomerChema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const customer = await service.FindOne(id)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

routerCustomer.post('/',
  validatorHandler(createCustomerShema,'body'),
  async (req,res,next)=>{
    try {
      const body = req.body
      const customer = await service.create(body)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

routerCustomer.patch('/:id',
  validatorHandler(getCustomerChema,'params'),
  validatorHandler(updateCustomerShema,'body'),
  async(req,res,next)=>{
    try {
      const  {id}= req.params
      const body = req.body
      const customer = await service.update(id,body)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

routerCustomer.delete('/:id',
  validatorHandler(getCustomerChema,'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params
      const customer = await service.delete(id)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = routerCustomer
