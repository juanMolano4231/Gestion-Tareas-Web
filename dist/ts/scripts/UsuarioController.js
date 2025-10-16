import { Usuario } from "../models/Usuario.js";
export class UsuarioController {
    // Obtiene todos los usuarios del localStorage
    static getUsuarios() {
        const data = localStorage.getItem("usuarios");
        if (!data)
            return [];
        return JSON.parse(data).map((u) => Usuario.fromJSON(u));
    }
    // Guarda todos los usuarios en localStorage
    static saveUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    // Crea el usuario default
    static ensureDefault() {
        let usuarios = this.getUsuarios();
        if (usuarios.length === 0) {
            const defaultUser = new Usuario("admin", "admin123", "admin@default.com");
            usuarios.push(defaultUser);
            this.saveUsuarios(usuarios);
        }
    }
    // Registra un nuevo usuario
    static register(username, contrasena, email) {
        let usuarios = this.getUsuarios();
        if (usuarios.some(u => u.getEmail === email)) {
            return null; // El correo ya existe
        }
        const nuevo = new Usuario(username, contrasena, email);
        usuarios.push(nuevo);
        this.saveUsuarios(usuarios);
        return nuevo;
    }
    // Guarda el usuario actualmente logueado
    static setUsuarioActual(usuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    }
    // Obtiene el usuario actualmente logueado
    static getUsuarioActual() {
        const data = localStorage.getItem("usuarioActual");
        return data ? Usuario.fromJSON(JSON.parse(data)) : null;
    }
}
// Expone funciones globales para login y registro usando solo UsuarioController
export function exposeUsuarioControllerGlobals() {
    // Asegura usuario por defecto al cargar la página
    UsuarioController.ensureDefault();
    // Login por email y clave
    window.login = function () {
        const email = document.getElementById("EmailLogin").value;
        const clave = document.getElementById("ClaveLogin").value;
        const usuarios = UsuarioController.getUsuarios();
        const usuario = usuarios.find(u => u.getEmail === email && u.getContrasena === clave);
        if (usuario) {
            UsuarioController.setUsuarioActual(usuario);
            alert("Login exitoso");
            window.location.href = "main.html";
        }
        else {
            alert("Email o clave incorrectos");
        }
    };
    // Registro por username, email y clave
    window.registrar = function () {
        const username = document.getElementById("Username").value;
        const email = document.getElementById("EmailRegistro").value;
        const clave = document.getElementById("ClaveRegistro").value;
        const nuevo = UsuarioController.register(username, clave, email);
        if (nuevo) {
            alert("Registro exitoso");
        }
        else {
            alert("El correo ya está registrado");
        }
    };
    // Logout global
    window.logout = function () {
        localStorage.removeItem("usuarioActual");
        alert("Sesión cerrada");
        window.location.href = "login.html";
    };
}
