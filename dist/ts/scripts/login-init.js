// src/ts/scripts/login-init.ts
import { UsuarioController } from "./UsuarioController.js";
import { TareasController } from "./TareasController.js";
import { GruposController } from "./GruposController.js";
import { Tarea } from "../models/Tarea.js";
// Verificar si hay usuario autenticado
const usuario = UsuarioController.getUsuarioActual();
if (!usuario) {
    window.location.href = "login.html";
    throw new Error("Usuario no autenticado, redirigiendo...");
}
console.log(`Bienvenido, ${usuario.getUsername}`);
// Asegurar que el grupo "Sin grupo" exista
let grupos = GruposController.getGrupos();
if (!grupos.some((g) => g.getId === 0)) {
    GruposController.ensureDefault();
    console.log("Grupo 'Sin grupo' creado.");
}
// Asegurar tareas iniciales si el usuario no tiene
const tareas = usuario.getTareas;
if (!tareas || tareas.length === 0) {
    const ejemplos = [
        new Tarea(1, "Bienvenido", "Tu primera tarea de ejemplo", "pendiente", TareasController.todaysDate(), 0),
        new Tarea(2, "Explora la app", "Crea tus propios grupos y tareas", "en curso", TareasController.todaysDate(), 0)
    ];
    usuario.setTareas = ejemplos;
    // Actualizar en el array de usuarios
    const usuarios = UsuarioController.getUsuarios();
    usuario.selfUpdate(usuarios);
    UsuarioController.setUsuarios(usuarios);
    UsuarioController.guardarUsuarioActual(usuario);
    console.log("Tareas de ejemplo creadas para el nuevo usuario.");
}
