const Usuario = require("../modelo/usuariomodels");

const usuarioController = {
    obtenerUsuarios: (req, res) => {
        Usuario.obtenerTodos((err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        });
    },
    agregarUsuario: (req, res) => {
        Usuario.agregar(req.body, (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, ...req.body });
        });
    },
    actualizarUsuario: (req, res) => {
        Usuario.actualizar(req.params.id, req.body, (err) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: "Usuario actualizado" });
        });
    },
    eliminarUsuario: (req, res) => {
        Usuario.eliminar(req.params.id, (err) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: "Usuario eliminado" });
        });
    }
};

module.exports = usuarioController;
