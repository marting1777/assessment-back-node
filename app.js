// Module Dependencies
const express = require('express')
const routes = require('./routes')
const user = require('./routes/user')
const http = require('http')
const path = require('path')

const port = process.env.PORT || 3000

const app = express()

app.listen(port, () => console.log(`Starting on port ${port}`))

