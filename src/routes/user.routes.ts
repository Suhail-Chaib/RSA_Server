import {Router} from "express"; 
import userController from '../controllers/user.controller'

// Router nos permite gestionar rutas de la API
const router = Router();

router.put('/login-user/:password', userController.loginUser);
router.post('/register-user', userController.registerUser);


// Exportamos router para usar rutas en app.ts
export default router;