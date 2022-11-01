const { Client } = require ('pg')

async function getConection(){

const cliente = new Client({
    host:'localhost',
    port:5432,
    user:'jair',
    password:'admin123',
    database:'my_store'
})
await cliente.connect();
return cliente;
}

module.exports = getConection
