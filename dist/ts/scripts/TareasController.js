var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Tarea } from "../models/Tarea.js";
import { UsuarioController } from "./UsuarioController.js";
import { loadTareasFromAPI } from "./jsonPlaceHolder.js";
export class TareasController {
    // Crea la llave de guardado del usuario actual
    static getStorageKey() {
        const usuario = UsuarioController.getUsuarioActual();
        return usuario ? `tareas_${usuario.getEmail}` : "tareas_default";
    }
    // Comprueba si existen tareas
    static hasTareas() {
        return localStorage.getItem(this.getStorageKey()) ? true : false;
    }
    // Fetchea tareas de ejemplo
    static createSample() {
        return __awaiter(this, void 0, void 0, function* () {
            const todas = yield loadTareasFromAPI();
            const tres = todas.slice(0, 3);
            this.setTareas(tres);
        });
    }
    // Se obtienen todas las tareas
    static getTareas() {
        let raw = JSON.parse(localStorage.getItem(this.getStorageKey()) || "[]");
        return raw.map((t) => Tarea.fromJSON(t));
    }
    // Se guardan todas las tareas
    static setTareas(tareas) {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(tareas));
    }
    // Se genera un id nuevo para una tarea
    static generarId() {
        if (this.getTareas().length === 0)
            return 1;
        return Math.max(...this.getTareas().map((t) => t.getId)) + 1;
    }
    // Se obtiene la fecha actual
    static todaysDate() {
        return new Date().toISOString().split("T")[0];
    }
    // Se agrega una tarea a la lista
    static add(tarea) {
        let tareas = this.getTareas();
        tareas.push(tarea);
        this.setTareas(tareas);
    }
    // Se obtiene la tarea seleccionada
    static getTareaSeleccionada() {
        let data = JSON.parse(localStorage.getItem("tareaSeleccionada") || "[]");
        return data ? Tarea.fromJSON(data) : null;
    }
}
