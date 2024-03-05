const router= require('./Routes/router')

const appMiddleware = require('./Middlewares/appMiddleware')
//1) import dotenv
require('dotenv').config()

//2) import express
const express = require("express")

// import connection.js
require('./DB/connections')

//3) import cors
const cors = require('cors')

//4) create server
const pfServer = express();

//5) make use of cors by server
pfServer.use(cors())

//6) use a middleware, to convert json to javascript object
pfServer.use(express.json());

//pfServer.use(appMiddleware)

pfServer.use(router)

// pfserver shoul expose the path uploads
pfServer.use('/uploads',express.static('./uploads'))

//7) define port
const PORT = 4000;

//8) run the server
pfServer.listen(PORT, ()=>{
    console.log(`Server is running successfully at pot : ${PORT}`)
})

pfServer.get('/', (req,res)=>{
    res.send("Project fair server is running successfully")
})