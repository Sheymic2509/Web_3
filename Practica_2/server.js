const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_simple'
});

db.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conectado a la base de datos');
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Necesario para manejar datos JSON en las peticiones
app.use(express.static(__dirname));

// Ruta para guardar productos
app.post('/guardar', (req, res) => {
    const { nombre, precio } = req.body;

    db.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio], (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al guardar el producto' });
        }
        res.status(200).json({ success: true });
    });
});

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos WHERE 1', (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.status(200).json(resultados);  // Envía los productos al cliente
    });
});

app.listen(3000, () => {
    console.log('Servidor listo en http://localhost:3000');
});

process.on('SIGINT', () => {
    db.end();  // Cerrar la conexión
    process.exit();  // Finalizar el programa
});
