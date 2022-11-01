const HapiBoom = require('@hapi/boom');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class CategoryService{
  constructor() { }

  async find() {
    const category = await prisma.category.findMany()
    return category
  }

  async FindOne(id) {
    const category = await prisma.category.findUnique({ include :{Product:true},
      where: {
        id: Number(id)
      }
    })
    if (!category) {
      throw HapiBoom.notFound("La categoría no se encuentra")
    }
    return { category }
  }

  async create(data) {
    const category = await prisma.category.create({data:data})
    if (!category) {
      throw HapiBoom.notFound("La categoría no fue creada")
    }
    return category
  }
  async update(id, changes) {
    const category = await this.FindOne(id)
    if (!category) {
      throw HapiBoom.notFound("La categoria no se encuentra")
    }
    const categoryUpdate = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: changes
    })
    return categoryUpdate
  }
  async delete(id) {
    const category = await this.FindOne(id)
    const deleteCategory = await prisma.category.delete({
      where: {
        id: Number(id)
      }
    })
    return { id }
  }
}

module.exports = CategoryService
