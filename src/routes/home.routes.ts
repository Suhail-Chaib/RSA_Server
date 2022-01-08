import {Router} from "express"; 
import homeController from '../controllers/home.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

//router.post('/encrypt', homeController.encrypt);
router.get('/postPublicKey', homeController.generatePublicKey);
router.get('/getPublicKey/:password', homeController.getPublicKey);
router.post('/postData', homeController.postEncrypted);
router.get('/getData/:password', homeController.getData);
router.get('/getPrivateKey/:password', homeController.getPrivateKey);
router.get('/getUser/:password', homeController.getUser);
router.post('/postData2', homeController.postSigned);
router.get('/getData2/:password', homeController.getData2);



// Exportamos router para usar rutas en app.ts
export default router;