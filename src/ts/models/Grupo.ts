import { Tarea } from "./Tarea.js";

export class Grupo {
	private nombre: string = "Nuevo grupo";
	private tareas: Tarea[] = [];

	constructor(nombre?: string, tareas?: Tarea[]) {
		if (nombre) this.nombre = nombre;
		if (tareas) this.tareas = tareas;
	}

	// Getters
	get getNombre(): string {
		return this.nombre;
	}

	get getTareas(): Tarea[] {
		return this.tareas;
	}

	// Setters
	set setNombre(nombre: string) {
		this.nombre = nombre;
	}

	set setTareas(tareas: Tarea[]) {
		this.tareas = tareas;
	}
}
