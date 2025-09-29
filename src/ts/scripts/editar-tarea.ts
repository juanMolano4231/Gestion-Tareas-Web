import { Tarea } from "../models/Tarea.js";
import type { EstadoTarea } from "../models/Tarea.js";
import { GruposController } from "./GruposController.js";
import { TareasController } from "./TareasController.js";

// Se obtiene la tarea seleccionada
let tarea: Tarea | null = TareasController.getTareaSeleccionada();

// Se asignan los datos de esa tarea a los inputs
if (tarea) (document.getElementById("titulo") as HTMLInputElement).value = tarea.getTitulo;
if (tarea) (document.getElementById("descripcion") as HTMLInputElement).value = tarea.getDescripcion;
if (tarea) (document.getElementById("estado") as HTMLInputElement).value = tarea.getEstado;
if (tarea) (document.getElementById("fechaCreacion") as HTMLInputElement).value = tarea.getFechaCreacion;
if (tarea) (document.getElementById("grupoId") as HTMLInputElement).value = tarea.getGrupoId.toString();


(window as any).editar = function () {

	// obtener el grupoId del input y validar
	let grupoIdInput = Number((document.getElementById("grupoId") as HTMLInputElement).value);
	const grupos = GruposController.getGrupos();
	if (!grupos.some((g: any) => g.id === grupoIdInput)) {
		alert("El grupo seleccionado no existe. Se asignará al grupo 'Sin grupo'.");
		grupoIdInput = 0;
	}

	// Se asigna el grupo a la tarea
	if (tarea) tarea.setGrupoId = grupoIdInput;

	// Se crea un nuevo objeto tarea con los datos actualizados
	let tareaEditada = new Tarea(
		tarea ? tarea.getId : -1,
		tarea ? (document.getElementById("titulo") as HTMLInputElement).value : undefined,
		tarea ? (document.getElementById("descripcion") as HTMLInputElement).value : undefined,
		tarea ? (document.getElementById("estado") as HTMLInputElement).value as EstadoTarea : undefined,
		tarea ? (document.getElementById("fechaCreacion") as HTMLInputElement).value : undefined,
		tarea ? tarea.getGrupoId : undefined)

	// Se obtienen todas las tareas
	let tareas: Tarea[] = TareasController.getTareas();

	// Edita la tarea
	tareaEditada.selfUpdate(tareas);

	// Actualiza la lista de tareas con la nueva tarea
	TareasController.setTareas(tareas);

	window.location.href = "index.html";
}
