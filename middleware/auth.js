//Importamos las librerias necesarias
import jwt from 'jsonwebtoken';

//Auth: Valida que se haya iniciado sesion antes de ingresar al controlador
export const auth = async (req, res, next) => {
    try {
        //Guardamos el token que viene en el header de la peticion
        const token = req.headers.authorization.split(" ")[1];

        //Si el token existe verificamos que sea un token valido utilizando el secreto
        if (token) {
            jwt.verify(token, process.env.SECRETO);
        }

        //Si todo salio bien continuamos al controlador
        next();
        
    } catch (error) {
        //Si falla algo en el proceso, devolvemos un 401 con un mensaje
        res.status(401).json({ mensaje: "Petición con token vencido, incorrecto o sin token." })
    }
}