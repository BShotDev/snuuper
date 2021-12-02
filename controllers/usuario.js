//Importamos las librerias necesarias
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Importamos el modelo
import Usuario from '../models/usuario.js';

//Creamos los controladores

//Metodo GET
export const getUsuarios = async (req, res) => {
    try {
        //Utilizamos find para traer toda la coleccion sin la contraseña
        const usuario = await Usuario.find({}, ['-clave', '-__v']);

        //Si todo esta correcto responde un 200 con los datos en JSON
        res.status(200).json(usuario);

    } catch (error) {
        //Si no encuentra ningun usuario devuelve un mensaje con el error
        res.status(404).json({ mensaje: "No hay usuarios registrados." });
    }
}

//Metodo Inicio Sesion
export const login = async (req, res) => {
    //Guardamos en constantes el correo y la clave
    const { correo, clave } = req.body;

    try {
        //Verificamos que exista el usuario utilizando el correo
        const existeUsuario = await Usuario.findOne({ correo });

        //Si no existe devolvemos un 400 con un mensaje que no detalle el error por seguridad
        if (!existeUsuario) return res.status(400).json({ mensaje: "Inicio de sesión inválido." });

        //Si existe comparamos la clave guardada en la BD con la clave enviada
        const contraseñaCorrecta = await bcrypt.compare(clave, existeUsuario.clave);

        //Si no coinciden devolvemos un 400 con un mensaje que no detalle el error por seguridad
        if (!contraseñaCorrecta) return res.status(400).json({ mensaje: "Inicio de sesión inválido." });

        //Si coinciden generamos un token JWT
        const token = jwt.sign({ correo: existeUsuario.correo }, process.env.SECRETO, { expiresIn: "1h" });

        //Si todo esta correcto devolvemos un 200 el usuario y el token
        res.status(200).json({ usuario: existeUsuario.correo, token });

    } catch (error) {
        //Si falla algo devolvemos un 500 y un mensaje
        res.status(500).json({ mensaje: "Algo salió mal." });
    }
}

//Metodo Registro de usuarios
export const signup = async (req, res) => {
    //Guardamos en constantes los datos del usuario, la clave y la confirmacion
    const { correo, rut, nombre, apellido, direccion, telefono, clave, confirmarClave } = req.body;

    try {
        //Buscamos al usuario por el correo
        const existeCorreo = await Usuario.findOne({ correo });

        //Si existe un usuario registrado, devolvemos un 400 y un mensaje
        if (existeCorreo) return res.status(400).json({ mensaje: "El correo ya está en uso." });

        //Si no existe buscamos al usuario por el rut
        const existeRut = await Usuario.findOne({ rut });

        //Si existe un usuario registrado, devolvemos un 400 y un mensaje
        if (existeRut) return res.status(400).json({ mensaje: "El rut ya está en uso." });

        //Si no existe verificamos que las claves coincidan, si no coinciden, devolvemos un 400 y un mensaje
        if (clave !== confirmarClave) return res.status(400).json({ mensaje: "Las contraseñas no coinciden." });

        //Si coinciden encriptamos la clave con bcrypt
        const encriptarClave = await bcrypt.hash(clave, 12);

        //Creamos al usuario y el resultado lo guardamos en una constante
        const resultado = await Usuario.create({ rut, correo, clave: encriptarClave, nombre, apellido, direccion, telefono });

        //Generamos un token JWT
        const token = jwt.sign({ correo: resultado.correo }, process.env.SECRETO, { expiresIn: "1h" });

        //Si todo esta correcto, devolvemos un 200, el usuario y el token
        res.status(200).json({ usuario: resultado.correo, token });

    } catch (error) {
        //Si falla algo, devolvemos un 500 y un mensaje
        res.status(500).json({ mensaje: "Algo salió mal." })
    }
}