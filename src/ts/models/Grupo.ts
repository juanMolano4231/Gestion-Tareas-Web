import { Tarea } from "./Tarea.js";

export class Grupo {
	nombre: string = "Nuevo grupo";
	tareas: Tarea[] = [];

	constructor(nombre?: string, tareas?: Tarea[]) {
		if (nombre) this.nombre = nombre;
		if (tareas) this.tareas = tareas;
	}
}