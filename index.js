//Importamos las librerias necesarias
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

//Importamos las rutas de los controladores
import usuarioRoutes from './routes/usuario.js';
import usuarioAuthRoutes from './routes/usuarioAuth.js';

//Inicializamos la app con express
const app = express();

//Inicializamos dotenv para usar las variables de entorno del .env
dotenv.config();

//Configuraciones iniciales
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Definimos las rutas del backend, pasando el prefijo que tendrán las rutas de esos controladores
app.use('/users', usuarioRoutes);
app.use('/auth', usuarioAuthRoutes);

//Creamos constantes con el puerto de conexión y la cadena conexión de MongoDB del .env
const CONEXION_URL = process.env.CONEXION_URL;
const PUERTO = process.env.PUERTO;

//Utilizamos mongoose para realizar la conexión con la base de datos. Si sale bien enviamos un mensaje con el puerto, si falla enviamos un mensaje con el error
mongoose.connect(CONEXION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PUERTO, () => console.log(`El servidor está funcionando en el puerto: ${PUERTO}`)))
    .catch((error) => console.log(error));

