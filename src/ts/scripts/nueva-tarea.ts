import { Tarea } from "../models/Tarea.js";
import type { EstadoTarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";

const tareas: Tarea[] = TareasController.getTareas();

(window as any).crear = function () {
	const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
	const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
	const estado = (document.getElementById("estado") as HTMLInputElement).value as EstadoTarea;

	const nuevaTarea = new Tarea(
		TareasController.generarId(),
		titulo,
		descripcion,
		estado,
		TareasController.todaysDate()
	);

	TareasController.add(nuevaTarea);

	window.location.href = "ver-tareas.html";
};
