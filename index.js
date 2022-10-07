const express = require('express');
const routerApi = require('./routes')
const {logErrors,errorHandler,boomErrorHandler} =require ('./middlewares/error.handler')

const app = express();
const port = 3001;

// middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('Hola mi server en express');

});
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola souy nuevo endpoint');

});





routerApi(app);
// Usando middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)




app.listen(port, () => {
  //console.log('Mi port' + port)
})
