import { Tarea } from "../models/Tarea.js";
import type { EstadoTarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";

let tarea: Tarea | null = TareasController.getTareaSeleccionada();

if (tarea) (document.getElementById("titulo") as HTMLInputElement).value = tarea.getTitulo;
if (tarea) (document.getElementById("descripcion") as HTMLInputElement).value = tarea.getDescripcion;
if (tarea) (document.getElementById("estado") as HTMLInputElement).value = tarea.getEstado;
if (tarea) (document.getElementById("fechaCreacion") as HTMLInputElement).value = tarea.getFechaCreacion;

(window as any).editar = function() {
	let tareaEditada = new Tarea(
		tarea ? tarea.getId : -1,
		tarea ? (document.getElementById("titulo") as HTMLInputElement).value : undefined,
		tarea ? (document.getElementById("descripcion") as HTMLInputElement).value : undefined,
		tarea ? (document.getElementById("estado") as HTMLInputElement).value as EstadoTarea : undefined,
		tarea ? (document.getElementById("fechaCreacion") as HTMLInputElement).value : undefined
	);

	let tareas: Tarea[] = TareasController.getTareas();

	tareaEditada.selfUpdate(tareas);

	TareasController.setTareas(tareas);

	window.location.href = "index.html";
}
