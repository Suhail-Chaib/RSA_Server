const mongoose = require("mongoose");

//Modelo de objeto que se guarda en la BBDD de MongoDB
const dataSchema = new mongoose.Schema({
    data: {
        type: String
    },
    n:{
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface Idata extends Document {
    data: String;
    n: String
}

//Exportamos modelo para poder usarlo
const data = mongoose.model("data", dataSchema);

module.exports = data;
