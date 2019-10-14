const express = require('express')
const router = express.Router()
const express_graphql = require('express-graphql')
const {schema, root} = require('../controllers/documents')

router.post('/', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

module.exports = router