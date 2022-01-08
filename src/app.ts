//Importamos dependencias
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as bodyParser from'body-parser';

//Importamos fichero de rutas
import homeRoutes from './routes/home.routes'
import userRoutes from './routes/user.routes'

//Inicializamos express
const app = express();

//Configuración
//Cuando haya variable de entorno sera PORT y sino 3000
app.set('port', process.env.PORT || 3800);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());

app.use('/home', homeRoutes);
app.use('/user', userRoutes);

//Exportamos fichero como 'app'
export default app;