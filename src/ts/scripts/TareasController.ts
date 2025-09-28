import { Tarea } from "../models/Tarea.js";

export class TareasController {

	static hasTareas() {
		return localStorage.getItem("tareas") ? true : false;
	}

	static createSample() {
		const ejemplos: Tarea[] = [
			new Tarea(1, "Comprar pan", "Ir a la tienda y comprar pan fresco", "pendiente", "2025-09-11"),
			new Tarea(2, "Estudiar JS", "Repasar clases y objetos en JavaScript", "en curso", "2025-09-10"),
			new Tarea(3, "Hacer ejercicio", "Correr 30 minutos en el parque", "completada", "2025-09-09")
		];

		this.setTareas(ejemplos);
	}

	static getTareas() {
		let raw = JSON.parse(localStorage.getItem("tareas") || "[]");
		return raw.map((t: any) => Tarea.fromJSON(t));
	}

	static setTareas(tareas: Tarea[]) {
		localStorage.setItem("tareas", JSON.stringify(tareas));
	}
	
	static generarId() {
		if (this.getTareas().length === 0) return 1;
		return Math.max(...this.getTareas().map((t: Tarea) => t.getId)) + 1;
	}

	static todaysDate() {
		return new Date().toISOString().split("T")[0];
	}

	static add(tarea: Tarea) {
		let tareas: Tarea[] = this.getTareas();
		tareas.push(tarea);
		this.setTareas(tareas);
	}

	static getTareaSeleccionada() {
		let data: string | null = JSON.parse(localStorage.getItem("tareaSeleccionada") || "[]");
		return data ? Tarea.fromJSON(data) : null;
	}

}
