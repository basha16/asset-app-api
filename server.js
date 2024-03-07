const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

const app = express()
app.use(express.json())
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var assestRouter = require('./routes/assest');

var corsOptions = {
    origin: '*',
};
app.use(cors());



app.listen(8081,()=>{
    console.log("listening")
})
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/asset', assestRouter);