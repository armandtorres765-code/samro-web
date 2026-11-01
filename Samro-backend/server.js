const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Cadena con tu usuario y contraseña generados por MongoDB Atlas
const MONGO_URI = 'mongodb+srv://armandtorres765_db_user:xL2RBuM8FAhMIBqk@cluster0.xkh1rqn.mongodb.net/SAMRO_DB?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('¡Conectado exitosamente a MongoDB Atlas!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema y modelo de los contactos
const contactoSchema = new mongoose.Schema({
    nombre: String,
    empresa: String,
    correo: String,
    servicio: String,
    mensaje: String,
    fechaRegistro: { type: Date, default: Date.now }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

// Ruta POST para recibir el formulario y guardarlo en MongoDB
app.post('/api/contacto', async (req, res) => {
    try {
        const { nombre, empresa, correo, servicio, mensaje } = req.body;

        console.log('--- Nuevo mensaje recibido de la web ---');
        console.log(`Nombre: ${nombre}`);

        const nuevoContacto = new Contacto({
            nombre,
            empresa,
            correo,
            servicio,
            mensaje
        });

        await nuevoContacto.save();

        res.json({ success: true, message: 'Guardado en MongoDB con éxito' });
    } catch (err) {
        console.error('Error al guardar:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor de SAMRO escuchando en http://localhost:3000');
});