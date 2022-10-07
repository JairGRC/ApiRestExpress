const express = require('express');
const ProductService = require('./../services/productService')

const validatorHandler = require ('./../middlewares/validator.handler')

const {createProductDTO,updateProductDTO,getProductDTO} = require ('./../schemas/productDTO')
const router = express.Router();

const service = new ProductService()



router.get('/', async (req, res) => {
  const products = await service.find()
  res.status(200).json(products);
});

// EndPoint especifica deben ser antes de la  dinamicas
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
})

router.get('/:id',
validatorHandler(getProductDTO,'params'),
async (req, res,next) => {
  try {
    const { id } = req.params;

    const product =await service.findOne(id)
    res.json(product)

  } catch (error) {
    next(error)
  }
});



router.post('/',
validatorHandler(createProductDTO,'body'),
async (req, res) => {
  const body = req.body
  const newProduct = await service.create(body);
  res.json(
    newProduct
  )
})

router.patch('/:id',
validatorHandler(getProductDTO,'params'),
validatorHandler(updateProductDTO,'body'),
async (req, res,next) => {
  try {
    const { id } = req.params;
    const body = req.body
    const rta = await service.update(id,body)
    res.json(rta)
  } catch (error) {
    next(error)
  }

})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id)
  res.json(product)
})

module.exports = router
