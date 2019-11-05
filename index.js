const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const db = require('./queries');

server.use(express.json());
server.use(express.static('./view'));


const banco = [];
/*
server.get('/', function(request, response) {
  response.render('index.html');
});

server.get('/lastInfo',(request, response)=>{
  return response.json(banco[banco.length - 1]);
});

server.post('/addInfo',(request, response)=>{
  var info = request.body;
  banco.push(info);
  return response.json(banco);
})
*/



server.get('/users', db.getUsers)
server.get('/users/:id', db.getUserById)
server.get('/usuarios/:id',db.getUserPorId)
server.post('/users', db.createUser)
server.put('/users/:id', db.updateUser)
server.delete('/users/:id', db.deleteUser)

server.listen(process.env.PORT || 3333, ()=>{
  console.log('Listen in port 3333.')
});