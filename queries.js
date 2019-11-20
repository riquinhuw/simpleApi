const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { name, email } = request.body
    console.log(request.body)
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
       response.status(201).send(`User added with ID: ${results .insertId}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  const getUserPorId = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.json(results.rows)
    })
  }


  // 
  const getTemp = (request, response) => {
    pool.query('SELECT * FROM regadas ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getLastTemp = (request, response) => {
  
    pool.query('SELECT * FROM regadas ORDER BY id DESC LIMIT 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const postTemp = (request, response) => {
    const { umidade, regada } = request.body
    console.log(request.body)
    pool.query('INSERT INTO regadas (umidade, regada) VALUES ($1, $2)', [umidade, regada], (error, results) => {
      if (error) {
        throw error
      }
       response.status(201).send(`Regada adicionada com o ID: ${results .insertId}`)
    })
  }


  const deleteTemp = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM regadas WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Regada removida de ID: ${id}`)
    })
  }
  //update comando set regar=1 where id=1;

  const updateComandoRegarOn = (request, response) => {  
    pool.query(
      'update comando set regar=1 where id=1;',
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Comando de regar foi enviado`)
      }
    )
  }

  const updateComandoRegarOff = (request, response) => {  
    pool.query(
      'update comando set regar=0 where id=1;',
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Retirando comando de regar`)
      }
    )
  }

  const getComandoRegar = (request, response) => {
  
    pool.query('SELECT regar FROM comando ORDER BY id DESC LIMIT 1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserPorId,
    deleteTemp,
    postTemp,
    getLastTemp,
    getTemp,
    updateComandoRegarOn,
    updateComandoRegarOff,
    getComandoRegar,
  }