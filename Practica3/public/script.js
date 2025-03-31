const API_URL = "http://localhost:3000/usuarios";
let usuarioEditando = null; // Para almacenar el usuario en edición

document.addEventListener("DOMContentLoaded", cargarUsuarios);

// Leer usuarios y mostrar en la tabla
function cargarUsuarios() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let tabla = document.getElementById("usersTable");
            tabla.innerHTML = "";
            data.forEach(user => {
                tabla.innerHTML += `<tr>
                    <td>${user.id}</td>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>${user.telefono}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editarUsuario(${user.id}, '${user.nombre}', '${user.email}', '${user.telefono}')">Editar</button>
                        <button class="btn btn-danger" onclick="eliminarUsuario(${user.id})">Eliminar</button>
                    </td>
                </tr>`;
            });
        });
}

// Crear o actualizar usuario
document.getElementById("userForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value
    };

    if (usuarioEditando) {
        // Si estamos editando, hacemos una actualización (PUT)
        fetch(`${API_URL}/${usuarioEditando}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(() => {
            usuarioEditando = null; // Resetear estado de edición
            document.getElementById("btnSubmit").innerText = "Agregar"; // Volver a modo agregar
            limpiarFormulario();
            cargarUsuarios();
        });
    } else {
        // Si no estamos editando, creamos un nuevo usuario (POST)
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        }).then(() => {
            limpiarFormulario();
            cargarUsuarios();
        });
    }
});

// Función para preparar la edición de un usuario
function editarUsuario(id, nombre, email, telefono) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("email").value = email;
    document.getElementById("telefono").value = telefono;
    document.getElementById("btnSubmit").innerText = "Actualizar";
    usuarioEditando = id; // Guardar el ID del usuario en edición
}

// Eliminar usuario
function eliminarUsuario(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => cargarUsuarios());
}

// Limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("btnSubmit").innerText = "Agregar";
    usuarioEditando = null;
}