const mongoose = require("mongoose");

//Modelo de objeto que se guarda en la BBDD de MongoDB
const data2Schema = new mongoose.Schema({
    data: {
        type: String
    },
    keyA:{
        type: String
    },
    keyB:{
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface Idata2 extends Document {
    data: String;
    keyA: String;
    keyB: String;
}

//Exportamos modelo para poder usarlo
const data2 = mongoose.model("data2", data2Schema);

module.exports = data2;
