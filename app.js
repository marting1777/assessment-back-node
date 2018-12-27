// Module Dependencies
const express = require('express')
const request = require('request')
const routes = require('./routes')
const user = require('./routes/user')
const http = require('http')
const path = require('path')
const EmployeeProvider = require('./employeeProvider').EmployeeProvider

const port = process.env.PORT || 3000

const app = express()

// GET Clients List With Any Role
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

// GET Clients List By Name 
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

// GET Clients List By Id
app.get('/getClientListById/:id', (req, res) => {
    let id = req.params.id
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
                    if (client.id === id) {
                        return res.json(client)
                    }
                })
            }
        }
    })
})

// GET Policies List By Name
app.get('/getPoliciesByName/:name', (req, res) => {
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
                        let id = client.id
                        let url = 'http://mocky.io/v2/580891a4100000e8242b75c5'
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
                                    let PolicyList = []
                                    tempClient = clients['policies'].filter((policy) => {
                                        if (policy.clientId === id) {
                                            PolicyList.push(policy)
                                        }
                                    })
                                    return res.json(PolicyList)
                                }
                            }
                        })
                    }
                })
            }
        }
    })
})

// GET User With Its Proper Policy
app.get('/getUserByPolicy/:id', (req, res) => {
    let policyId = req.params.id
    let url = 'http://mocky.io/v2/580891a4100000e8242b75c5'
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
                console.log('Body:', body)
                let policies = JSON.parse(body)
                tempClient = policies['policies'].filter((policy) => {
                    if (policy.id === policyId) {
                        let clientId = policy.clientId
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
                                        if (client.id === clientId) {
                                            return res.json(client)
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        }
    })
})

app.listen(port, () => console.log(`Starting on port ${port}`))

