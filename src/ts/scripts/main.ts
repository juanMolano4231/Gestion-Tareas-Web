import { Tarea } from "../models/Tarea.js";

if (!localStorage.getItem("tareas")) {
	const ejemplos: Tarea[] = [
		new Tarea(1, "Comprar pan", "Ir a la tienda y comprar pan fresco", "pendiente", "2025-09-11"),
		new Tarea(2, "Estudiar JS", "Repasar clases y objetos en JavaScript", "en curso", "2025-09-10"),
		new Tarea(3, "Hacer ejercicio", "Correr 30 minutos en el parque", "completada", "2025-09-09")
	];

	localStorage.setItem("tareas", JSON.stringify(ejemplos));
}

