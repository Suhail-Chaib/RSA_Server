const mongoose = require("mongoose");

//Modelo de objeto que se guarda en la BBDD de MongoDB
const UserSchema = new mongoose.Schema({
    password: {
        type: String
    },
    publicKey : [
        {
            n: {
                type: String
            },
            e:{
                type: String
            }
        }
    ],
    privateKey : [
        {
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
        }
    ]
});

//Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    password: string;
    publicKey:[{n:string, e:string, password:string}];
    privateKey:[{d:string, publicKey:[{n:string, e:string, password:string}]}];
}

//Exportamos modelo para poder usarlo
const User = mongoose.model("user", UserSchema);

module.exports = User;
