const http = require('http')
const app = require('./app')

const port = process.env.PORT || 8080 

const server = http.createServer(app)
process.env.JWT_KEY = 'Secret'

server.listen(port)