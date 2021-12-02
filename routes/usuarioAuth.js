//Importamos las librerias necesarias
import express from 'express';

//Importamos los controladores
import { login, signup } from '../controllers/usuario.js';

//Importamos los middlewares

//Definimos nuestro router para crear las rutas con express
const router = express.Router();

//Rutas
router.post('/signup', signup);
router.post('/login', login);

//Exportamos las rutas
export default router;