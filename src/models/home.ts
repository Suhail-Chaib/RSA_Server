const mongoose = require("mongoose");

//Modelo de objeto que se guarda en la BBDD de MongoDB
const HomeSchema = new mongoose.Schema({
    text: {
        type: String
    },
});

//Interfaz para tratar respuesta como documento
export interface IHome extends Document {
    text: string;
}

//Exportamos modelo para poder usarlo
const Home = mongoose.model("Home", HomeSchema);

module.exports = Home;