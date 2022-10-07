const express = require('express');
const routerApi = require('./routes')

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

app.listen(port, () => {
  //console.log('Mi port' + port)
})
