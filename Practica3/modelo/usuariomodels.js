const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_js"
});

db.connect(err => {
    if (err) {
        console.error("Error de conexión:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

const Usuario = {
    obtenerTodos: (callback) => {
        db.query("SELECT * FROM usuarios", callback);
    },
    agregar: (datos, callback) => {
        db.query("INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)", 
        [datos.nombre, datos.email, datos.telefono], callback);
    },
    actualizar: (id, datos, callback) => {
        db.query("UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?", 
        [datos.nombre, datos.email, datos.telefono, id], callback);
    },
    eliminar: (id, callback) => {
        db.query("DELETE FROM usuarios WHERE id=?", [id], callback);
    }
};

module.exports = Usuario;
