import { Tarea } from "../models/Tarea.js";
import { UsuarioController } from "./UsuarioController.js";
import { loadTareasFromAPI } from "./jsonPlaceHolder.js";

export class TareasController {

    // Crea la llave de guardado del usuario actual
    static getStorageKey(): string {
        const usuario = UsuarioController.getUsuarioActual();
        return usuario ? `tareas_${usuario.getEmail}` : "tareas_default";
    }

    // Comprueba si existen tareas
    static hasTareas() {
        return localStorage.getItem(this.getStorageKey()) ? true : false;
    }

    // Fetchea tareas de ejemplo
    static async createSample() {
    	const todas = await loadTareasFromAPI();
    	const tres = todas.slice(0, 3);
    	this.setTareas(tres);
    }

    // Se obtienen todas las tareas
    static getTareas() {
        let raw = JSON.parse(localStorage.getItem(this.getStorageKey()) || "[]");
        return raw.map((t: any) => Tarea.fromJSON(t));
    }

    // Se guardan todas las tareas
    static setTareas(tareas: Tarea[]) {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(tareas));
    }

    // Se genera un id nuevo para una tarea
    static generarId() {
        if (this.getTareas().length === 0) return 1;
        return Math.max(...this.getTareas().map((t: Tarea) => t.getId)) + 1;
    }

    // Se obtiene la fecha actual
    static todaysDate() {
        return new Date().toISOString().split("T")[0];
    }

    // Se agrega una tarea a la lista
    static add(tarea: Tarea) {
        let tareas: Tarea[] = this.getTareas();
        tareas.push(tarea);
        this.setTareas(tareas);
    }

    // Se obtiene la tarea seleccionada
    static getTareaSeleccionada() {
        let data: string | null = JSON.parse(localStorage.getItem("tareaSeleccionada") || "[]");
        return data ? Tarea.fromJSON(data) : null;
    }

}
