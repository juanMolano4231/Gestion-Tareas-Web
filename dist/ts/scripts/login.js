import { UsuarioController } from "./UsuarioController.js";
window.login = function () {
    const email = document.getElementById("email").value.trim().toLowerCase();
    const contrasena = document.getElementById("contrasena").value;
    if (!email || !contrasena) {
        alert("Por favor ingresa tu correo y contraseña.");
        return;
    }
    const usuario = UsuarioController.login(email, contrasena);
    if (usuario) {
        UsuarioController.guardarUsuarioActual(usuario);
        alert(`Bienvenido, ${usuario.getUsername}`);
        window.location.href = "ver-tareas.html";
    }
    else {
        alert("Correo o contraseña incorrectos.");
    }
};
