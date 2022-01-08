//FICHERO EJECUCIÓN DEL PROYECTO
import app from './app'; //app exportada en app.ts
//Ejecutamos la conexion a la BBDD antes de escuchar al server
import './database'; 

import { createServer} from "http";

const httpServer = createServer(app);

httpServer.listen(app.get('port')); //Recuperamos puerto de app.ts
console.log('Server in port', app.get('port'));

/*//Ejecutamos la conexion a la BBDD antes de escuchar al server
import './database'; 

import * as express from 'express'


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(3000, function() {

  console.log("Listen in port 3000");
  
});*/




