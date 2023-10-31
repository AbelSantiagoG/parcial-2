const mongoose = require("mongoose");
const app = require("./app");
const {DB_USER, DB_PASSWORD, DB_HOST} = require("./config");
// Acceder al archivo .env
require("dotenv").config();


// Acceder a variables del .env se usa process.env
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Conectados por el puerto ${port}`));

// Crear conexión a base de datos mongo

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`)
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error(`Error al conectar a MongoDB ${err}`))
