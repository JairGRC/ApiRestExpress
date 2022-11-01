const HapiBoom = require('@hapi/boom');

const { PrismaClient } = require('@prisma/client');
const { number } = require('joi');
const CustomerService = require('./customerService')
const prisma = new PrismaClient()
const customerService = new CustomerService()

class ordenService {
  constructor(){}

  async find(){
    const orden = await prisma.orden.findMany()
    return orden
  }
  async findOne(id){
    const orden = await prisma.orden.findUnique({
      include:{products: {
        include:{
          Product : true
        }
      },Customer:{
        include:{
          User:true
        }
      }},
      where: {
        id: Number(id)
      }
    })

    if(!orden){
      throw HapiBoom.notFound('Orden no encontrada')
    }
    return orden
  }
  async create(data){
    const Customer  = await customerService.FindOne(data.customerId)
    const orden = await prisma.orden.create({data:data})
    if(!orden){
      throw HapiBoom.conflict('No se pudo registrar orden')
    }
    return orden
  }
  async update(id,changes){
    const orden = await this.findOne(id)
    const updateOrden =  await prisma.orden.update({
      where: {
        id: Number(id),
      },
      data: changes
    })
    if(!updateOrden){
      throw HapiBoom.conflict('No se pudo registrar orden')
    }
    return updateOrden
  }
  async delete(id){
    await this.findOne(id)
    const deleteOrden = await prisma.orden.delete({
      where: {
        id: Number(id)
      }
    })
    return { id }
  }
}

module.exports= ordenService
