import { Tarea } from "./Tarea.js";
import { Grupo } from "./Grupo.js";
export class Usuario {
    constructor(username, contrasena, email) {
        this.username = "defaultUsername";
        this.contrasena = "default123";
        this.email = "default@default.default";
        this.tareas = [];
        this.grupos = [];
        if (username)
            this.username = username;
        if (contrasena)
            this.contrasena = contrasena;
        if (email)
            this.email = email;
    }
    static fromJSON(data) {
        const usuario = new Usuario(data.username, data.contrasena, data.email);
        if (Array.isArray(data.tareas))
            usuario.setTareas = data.tareas;
        if (Array.isArray(data.grupos))
            usuario.setGrupos = data.grupos;
        return usuario;
    }
    selfUpdate(usuarios) {
        usuarios.forEach((u, i) => {
            if (u.getEmail === this.getEmail) {
                usuarios[i] = this;
            }
        });
    }
    // Getters
    get getUsername() {
        return this.username;
    }
    get getContrasena() {
        return this.contrasena;
    }
    get getEmail() {
        return this.email;
    }
    get getTareas() {
        return this.tareas;
    }
    get getGrupos() {
        return this.grupos;
    }
    // Setters
    set setUsername(username) {
        this.username = username;
    }
    set setContrasena(contrasena) {
        this.contrasena = contrasena;
    }
    set setEmail(email) {
        this.email = email;
    }
    set setTareas(tareas) {
        this.tareas = tareas;
    }
    set setGrupos(grupos) {
        this.grupos = grupos;
    }
}
