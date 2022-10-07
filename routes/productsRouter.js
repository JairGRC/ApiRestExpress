const express = require('express');

const router = express.Router();

// EndPoint especifica deben ser antes de la  dinamicas
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '999') {
    res.status(404).json({
      message: 'Not Found'
    })
  }else{
    res.status(200).json({
      id,
      name: "Prodcut 1",
      price: 1000
    })
  }
});

router.get('/', (req, res) => {
  res.json([
    {
      name: "Prodcut 1",
      price: 1000
    },
    {
      name: "Prodcut 12",
      price: 1000
    }
  ]);
});


router.post('/', (req, res) => {
  const body = req.body
  res.status(201).json({
    message: 'created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body
  res.json({
    message: 'update',
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id
  })
})

module.exports = router
