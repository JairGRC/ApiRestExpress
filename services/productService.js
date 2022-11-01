const HapiBoom = require('@hapi/boom');
const { PrismaClient } = require('@prisma/client');
const { number } = require('joi');

const prisma = new PrismaClient()



class ProductService {
  constructor() {
  }
  async find(params) {
    const {limit, ofsset} = params
    if(limit && ofsset){
      const option = {
        skip: Number(ofsset),
        take :Number(limit)
      }
      const product = await prisma.product.findMany(option)
      return product
    }else{
      const product = await prisma.product.findMany()
      return product
    }
  }
  async findOne(id) {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!product) {
      throw HapiBoom.notFound('Product not found')
    }
    return product
  }
  async create(data) {
    const categorie = await prisma.category.findUnique({
      where:{
        id:data.categoryId
      }
    })
    if(!categorie){
      throw HapiBoom.conflict('idCategoria  no existe ')
    }
    const product = prisma.product.create({data:data})
    if(!product){
      throw HapiBoom.conflict('Product no creado ')
    }
    return product

  }
  async update(id, changes) {
    const product  = await this.findOne(id)
    if (!product) {
      throw HapiBoom.notFound('Product not found')
    }
    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: changes
    })
    return updateProduct
  }
  async delete(id) {
    const product = await this.findOne(id)
    if (!product) {
      throw HapiBoom.notFound('Product not found')
    }
    const productDelete = await prisma.delete({
      where: {
        id: Number(id)
      }
    })
    return { id };
  }
}

module.exports = ProductService;
