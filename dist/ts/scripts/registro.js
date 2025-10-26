import { UsuarioController } from "./UsuarioController.js";
window.registrar = function () {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const contrasena = document.getElementById("contrasena").value;
    if (!username || !email || !contrasena) {
        alert("Por favor completa todos los campos.");
        return;
    }
    // Registrar usuario usando el controlador
    UsuarioController.registrarUsuario(username, email, contrasena);
    alert("Usuario registrado correctamente.");
    window.location.href = "login.html";
};
