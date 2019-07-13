import express from 'express'
// const express= require('express'); ES5
import morgan from 'morgan'
// const morgan= require('morgan'); ES5
import cors from 'cors'
// const cors= require('cors'); ES5
import path from 'path'
import mongoose from 'mongoose'
import router from './routes'

// MongoDB DataBase connection 
mongoose.Promise= global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsistema'
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true})
.then(mongoose => console.log('Conectado a  la DB en puerto 27017'))
.catch(err => console.log(err))

//Middleware 
const app= express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//define public route
app.use(express.static(path.join(__dirname, 'public')))

// routes 
app.use('/api', router)

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log("server on port: " + app.get('port'))
})