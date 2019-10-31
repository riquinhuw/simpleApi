const express = require('express');

const server = express();

server.use(express.json());

const banco = [];

server.get('/',(request, response)=>{
  return response.json(banco);
});

server.get('/lastInfo',(request, response)=>{
  return response.json(banco[banco.length - 1]);
});

server.post('/addInfo',(request, response)=>{
  var info = request.body;
  banco.push(info);
  return response.json(banco);
})

server.listen(process.env.PORT || 3333, ()=>{
  console.log('Listen in port 3333.')
});