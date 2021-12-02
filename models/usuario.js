//Importamos las librerias necesarias
import mongoose from 'mongoose';

//Definimos el esquema con mongoose
const usuarioSchema = mongoose.Schema({
    correo: { type: String, unique: true, required: true },
    rut: { type: String, unique: true, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    clave: { type: String, required: true },

}, { timestapms: true });

//Asignamos y exportamos por defecto el modelo creado desde el esquema
export default mongoose.model("Usuario", usuarioSchema);