//RECETA DE COCINA
//Establecer conexión con la BBDD de MongoDB

const mongoose = require("mongoose");
import config from './config/config';

mongoose.connect(config.DB.URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("Connected successfully");
  });

connection.on("error", console.error.bind(console, "connection error: "));