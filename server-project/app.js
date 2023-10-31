const express = require("express");
const cors = require('cors');



// app conectar por el puerto local el express
// especificar los middleware a utilizar

const app = express();
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const API_VERSION = 'api/v1';
app.use(cors())

// Pruebas con extensión REST Client
app.use(express.json());

// Pruebas desde Postman
app.use(express.urlencoded({extended: true}));



app.use(`/${API_VERSION}/users`, userRoutes);
app.use(`/${API_VERSION}/auth`, authRoutes);
// http://localhost:3100/api/v1/auth/


module.exports = app;
