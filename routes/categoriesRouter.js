const express = require('express');
const routerCategories = express.Router();
routerCategories.get('/:categoryId/products/:productID',(req,res)=>{
  const {categoryId,productID} = req.params;
  res.json({
    categoryId,
    productID
  })
});

module.exports = routerCategories
