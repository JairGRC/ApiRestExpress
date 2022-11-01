const HapiBoom = require('@hapi/boom');
const faker = require('faker')
//const pool = require('./../libs/postgres.pool')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class CustomerService {
  constructor() { }

  async find() {
    const customer = await prisma.Customer.findMany()
    return customer
  }
  async FindOne(id) {
    const customer = await prisma.Customer.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!customer) {
      throw HapiBoom.notFound("El cliente no se encuentra")
    }
    return { customer }
  }

  async create(data) {
    const customer = await prisma.customer.create({include:{User:true},data:data})
    if (!customer) {
      throw HapiBoom.notFound("El cliente no fue creado")
    }
    return customer
  }
  async update(id, changes) {
    const customer = await this.FindOne(id)
    if (!customer) {
      throw HapiBoom.notFound("El cliente no fue creado")
    }
    const customerUpdate = await prisma.Customer.update({
      where: {
        id: Number(id),
      },
      data: changes
    })
    return customerUpdate
  }
  async delete(id) {
    const customer = await this.FindOne(id)
    const deleteCustomer = await prisma.Customer.delete({
      where: {
        id: Number(id)
      }
    })
    return { id }
  }
}

module.exports = CustomerService
