//Importamos las librerias necesarias
import express from 'express';

//Importamos el controlador
import { getUsuarios } from '../controllers/usuario.js';

//Importamos el middleware
import { auth } from '../middleware/auth.js';

//Definimos nuestro router para crear las rutas con express
const router = express.Router();

//Ruta
router.get('/', auth, getUsuarios)

//Exportamos las rutas
export default router;