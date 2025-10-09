import { UsuarioController } from "./UsuarioController.js";
import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";

export class GruposController {

    // Crea la llave de guardado del usuario actual
    static getStorageKey(): string {
        const usuario = UsuarioController.getUsuarioActual();
        return usuario ? `grupos_${usuario.getEmail}` : "grupos_default";
    }

    // Se comprueba si existen grupos en localStorage
    static hasGrupos() {
        return localStorage.getItem(this.getStorageKey()) ? true : false;
    }

    // Se obtienen todos los grupos
    static getGrupos() {
        let raw = JSON.parse(localStorage.getItem(this.getStorageKey()) || "[]");
        return raw;
    }

    // Se actualiza la lista de grupos
    static setGrupos(grupos: any[]) {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(grupos));
    }

    // Comprueba la existencia de un grupo por defecto "sin grupo"
    static ensureDefault() {
        let grupos = this.getGrupos();
        if (!grupos.some((g: any) => g.id === 0)) {
            grupos.unshift({ id: 0, nombre: "Sin grupo" });
            this.setGrupos(grupos);
        }
    }

    // Genera un id autoincremental
    static generarId() {
        let grupos = this.getGrupos();
        if (grupos.length === 0) return 1;
        return Math.max(...grupos.map((g: any) => g.id)) + 1;
    }

    // Crea un grupo a partir del nombre proporcionado y la id autogenerada
    static add(nombre: string) {
        let grupos = this.getGrupos();
        const nuevo = { id: this.generarId(), nombre };
        grupos.push(nuevo);
        this.setGrupos(grupos);
        return nuevo;
    }

    // Obtiene las tareas en un grupo especifico
    static getTareasDeGrupo(id: number): Tarea[] {
        let tareas = TareasController.getTareas();
        return tareas.filter((t: Tarea) => t.getGrupoId === id);
    }
}
