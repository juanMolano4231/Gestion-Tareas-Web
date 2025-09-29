import { Tarea } from "../models/Tarea.js";
import type { EstadoTarea } from "../models/Tarea.js";
import { GruposController } from "./GruposController.js";
import { TareasController } from "./TareasController.js";

const tareas: Tarea[] = TareasController.getTareas();

(window as any).crear = function () {

	// obtener el grupoId del input y validar si existe el grupo
	let grupoIdInput = Number((document.getElementById("grupoId") as HTMLInputElement).value);
	const grupos = GruposController.getGrupos();
	if (!grupos.some((g: any) => g.id === grupoIdInput)) {
		alert("El grupo seleccionado no existe. Se asignará al grupo 'Sin grupo'.");
		grupoIdInput = 0;
	}

	// Obtener valores de inputs
	const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
	const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
	const estado = (document.getElementById("estado") as HTMLInputElement).value as EstadoTarea;

	// Crea una nueva tarea con la informacion obtenida
	const nuevaTarea = new Tarea(
		TareasController.generarId(),
		titulo,
		descripcion,
		estado,
		TareasController.todaysDate(),
		grupoIdInput
	);


	// Agrega la nueva tarea a la lista
	TareasController.add(nuevaTarea);

	window.location.href = "ver-tareas.html";
};
