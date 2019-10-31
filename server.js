const express = require('express');

const server = express();

server.use(express.json());

server.get('/',(request, response)=>{
  return response.json({ message: "It's Ok!"});
});

server.listen(3333, ()=>{
  console.log('Listen in port 3333.')
});