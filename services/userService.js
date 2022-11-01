
const HapiBoom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
//const getConection = require('./../libs/postgres')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


class UserService {
  constructor() { }

  async create(data) {
    const hash = await bcrypt.hash(data.password,10);
    const user = await prisma.User.create({data:{
      email : data.email,
      password: hash,
      role :data.role
    }})
    if(!user){
      throw HapiBoom.badRequest("El usuario no fue creado")
    }
    const campo = 'password'
    delete user[campo]
    return user
  }
  async find() {
    const rta =await prisma.user.findMany({
      include: {
        Customer: true,
      }
    })
    //await prisma.user.findMany()
    //const rta = await client.query('Select * from task')
    return rta
  }
  async findByEmail(email) {
    const rta =await prisma.user.findUnique({
      where:{email:email}
    })
    return rta
  }
  async findOne(id) {
    //const user = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${id}`
    const user = await prisma.user.findUnique({
      where:{
        id: Number(id)
      },include: {
        Customer: true,
      }
    })
    if(!user){
      throw HapiBoom.notFound("Usuario no encontrado")
    }
    return { user }
  }
  async update(id, changes) {
    let user = await this.findOne(id)
    if(!user){
      throw HapiBoom.notFound("Usuario no encontrado")
    }
    const UserUpdate = await prisma.user.update({
      where:{
        id:Number(id),
      },
      data:changes
    })
    //const UserUpdate = await this.findOne(id)
    return UserUpdate
  }
  async delele(id) {
    const user = await this.findOne(id)
    const deleteUser = await prisma.user.delete({
      where:{
        id:Number(id)
      }
    })
    return {id}
  }
}

module.exports = UserService
