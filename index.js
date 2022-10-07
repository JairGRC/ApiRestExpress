const express = require('express');
const cors = require('cors')
const routerApi = require('./routes')
const {logErrors,errorHandler,boomErrorHandler} =require ('./middlewares/error.handler')

const app = express();
const port = process.env.PORT||3001;

// middleware
app.use(express.json())

// Tema de acceso a los dominios
const whiteList = ['http://localhost:8080','https://myapp.co']
const option = {
  origin :(origin,callback)=>{
    if(whiteList.includes(origin)|| !origin){
      callback(null,true);
    }else{
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(option))
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
