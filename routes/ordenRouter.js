const express = require('express');
const OrdenService = require('./../services/ordenService')
const validatorHandler = require('./../middlewares/validator.handler')
const {  createOrdenSchema,getOrdenSchema,updateOrdenSchema} = require('./../schemas/ordenDTO');
const { CreateOrderSchema}= require('./../schemas/orderProductDTO')

const OPService = require('./../services/ordenProductService')

const ordenCustomer = express.Router();
const service = new OrdenService()
const opservice = new OPService()

ordenCustomer.get('/',
  async (req, res, next) => {
    try {
      const customer = await service.find()
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

ordenCustomer.get('/:id',
  validatorHandler(getOrdenSchema,'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params
      const customer = await service.findOne(id)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

ordenCustomer.post('/',
  validatorHandler(createOrdenSchema,'body'),
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

ordenCustomer.post('/add-item',
validatorHandler(CreateOrderSchema,'body'),
async (req,res,next)=>{
  try {
    const data = req.body
      const Item= await opservice.create(data)
      res.json(Item)
  } catch (error) {
    next(error)
  }
}
)

ordenCustomer.patch('/:id',
  validatorHandler(getOrdenSchema,'params'),
  validatorHandler(updateOrdenSchema,'body'),
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

ordenCustomer.delete('/:id',
  validatorHandler(getOrdenSchema,'params'),
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

module.exports = ordenCustomer
