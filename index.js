// import dotenv
// loads .env files contents into process .env by default
require('dotenv').config()

// import express

const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./Routing/router')

// import coonection.js
require('./DB/connection')

// create server
// creates an express application. the express() function is a top-level function exported by the express module.
const pfServer = express()

// use of cors by server
pfServer.use(cors())

// parsing json
// Returns middleware that only parses json -javascript object
pfServer.use(express.json())

// server using the router
pfServer.use(router)

//pfServer uuse upload folder
// first argument - how other application use folder
// second argument - to export that particular folder -expres.static

pfServer.use('/uploads',express.static('./uploads'))



//customize port - bydefault -server runs at 3000
const port = 4500 || process.env

//run server
pfServer.listen(port,()=>{
    console.log(`server Running succcesfully at ${port}`);
})

//get request
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:red">Project Fair is Launched</h1>`);
})

//post request
pfServer.post('/',(req,res)=>{
    res.send(`hehe!`);
})

//update request
pfServer.put('/',(req,res)=>{
    res.send(`hello world!`);
})
