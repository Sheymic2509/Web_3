const express = require("express");
const cors = require("cors");
const usuarioController = require("./controlador/usuarioController");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/usuarios", usuarioController.obtenerUsuarios);
app.post("/usuarios", usuarioController.agregarUsuario);
app.put("/usuarios/:id", usuarioController.actualizarUsuario);
app.delete("/usuarios/:id", usuarioController.eliminarUsuario);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
