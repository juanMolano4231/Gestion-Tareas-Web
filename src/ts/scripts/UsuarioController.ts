import { Usuario } from "../models/Usuario.js";

export class UsuarioController {
    // Obtiene todos los usuarios del localStorage
    static getUsuarios(): Usuario[] {
        const data = localStorage.getItem("usuarios");
        if (!data) return [];
        return JSON.parse(data).map((u: any) => Usuario.fromJSON(u));
    }

    // Guarda todos los usuarios en localStorage
    static saveUsuarios(usuarios: Usuario[]) {
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
    static register(username: string, contrasena: string, email: string): Usuario | null {
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
    static setUsuarioActual(usuario: Usuario) {
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    }

    // Obtiene el usuario actualmente logueado
    static getUsuarioActual(): Usuario | null {
        const data = localStorage.getItem("usuarioActual");
        return data ? Usuario.fromJSON(JSON.parse(data)) : null;
    }
}

// Expone funciones globales para login y registro usando solo UsuarioController
export function exposeUsuarioControllerGlobals() {
    // Asegura usuario por defecto al cargar la página
    UsuarioController.ensureDefault();

    // Login por email y clave
    (window as any).login = function () {
        const email = (document.getElementById("EmailLogin") as HTMLInputElement).value;
        const clave = (document.getElementById("ClaveLogin") as HTMLInputElement).value;
        const usuarios = UsuarioController.getUsuarios();
        const usuario = usuarios.find(u => u.getEmail === email && u.getContrasena === clave);
        if (usuario) {
            UsuarioController.setUsuarioActual(usuario);
            alert("Login exitoso");
            window.location.href = "index.html";
        } else {
            alert("Email o clave incorrectos");
        }
    };

    // Registro por username, email y clave
    (window as any).registrar = function () {
        const username = (document.getElementById("Username") as HTMLInputElement).value;
        const email = (document.getElementById("EmailRegistro") as HTMLInputElement).value;
        const clave = (document.getElementById("ClaveRegistro") as HTMLInputElement).value;
        const nuevo = UsuarioController.register(username, clave, email);
        if (nuevo) {
            alert("Registro exitoso");
        } else {
            alert("El correo ya está registrado");
        }
    };

    // Logout global
    (window as any).logout = function () {
        localStorage.removeItem("usuarioActual");
        alert("Sesión cerrada");
        window.location.href = "login.html";
    };
}