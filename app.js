// Module Dependencies
const express = require('express')
const request = require('request')
const routes = require('./routes')
const user = require('./routes/user')
const http = require('http')
const path = require('path')

const port = process.env.PORT || 3000

const app = express()

app.use(express.static(path.join(__dirname, '/public')))

// GET Employee List With Any Role
app.get('/getClientList', (req, res) => {
    let url = 'http://mocky.io/v2/5808862710000087232b75ac';
    let options = {
        url: url,
        method: 'GET',
        strictSSL: false
    };
    request(options, (error, response, body) => {
            if (error) {
                return console.error('Unable to handle request', error)
            } else {
                if (body) {
                    return res.json(JSON.parse(body))
                }
            }
        }
    )
})

app.get('/getClientListByName/:name', (req, res) => {
    let name = req.params.name
    let url = 'http://mocky.io/v2/5808862710000087232b75ac'
    let options = {
        url: url,
        method: 'GET',
        strictSSL: false
    }
    request(options, (error, response, body) => {
        if (error) {
            return console.log('Unable to handle request', error)
        } else {
            if (body) {
                let clients = JSON.parse(body)
                tempClient = clients['clients'].filter((client) => {
                    if (client.name === name) {
                        return res.json(client)
                    }
                })
            }
        }
    })
})


app.listen(port, () => console.log(`Starting on port ${port}`))

