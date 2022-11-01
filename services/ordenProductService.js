const HapiBoom = require('@hapi/boom');

//const pool = require('./../libs/postgres.pool')
const { PrismaClient } = require('@prisma/client')

const OrdenService = require('./ordenService')
const orderService = new OrdenService()
const ProductService = require('./productService')
const productService = new ProductService()

const prisma = new PrismaClient()

class OrderProducService{
  constructor(){}

  async create(data){
    await orderService.findOne(data.orderId)
    await productService.findOne(data.productId)
    const OrderProduct = await prisma.orden_Product.create({
        data:data
    })
    if(!OrderProduct){
      throw HapiBoom.notFound('No se pudo crear orden')
    }
    return OrderProduct
  }

}

module.exports = OrderProducService
