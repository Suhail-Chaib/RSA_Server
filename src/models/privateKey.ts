const mongoose = require("mongoose");

//Modelo de objeto que se guarda en la BBDD de MongoDB
const privateKeySchema = new mongoose.Schema({
    d: {
        type: String
    },
    publicKey : [
        {
            n: {
                type: String
            },
            e:{
                type: String
            },
            password:{
                type: String
            }
        }
    ],
    password:{
        type: String
    }
});

//Interfaz para tratar respuesta como documento
export interface IprivateKey extends Document {
    d: String;
    publicKey:[{n:String, e:String, password:String}];
    password: String;
}

//Exportamos modelo para poder usarlo
const privateKey = mongoose.model("privateKey", privateKeySchema);

module.exports = privateKey;