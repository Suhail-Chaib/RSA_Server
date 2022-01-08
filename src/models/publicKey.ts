const mongoose = require("mongoose");

//Modelo de objeto que se guarda en la BBDD de MongoDB
const publicKeySchema = new mongoose.Schema({
    n: {
        type: String
    },
    e:{
        type: String
    },
    password:{
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IpublicKey extends Document {
    n: String;
    e: String;
    password: String;
}

//Exportamos modelo para poder usarlo
const publicKey = mongoose.model("publicKey", publicKeySchema);

module.exports = publicKey;