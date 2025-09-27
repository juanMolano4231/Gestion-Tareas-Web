import { Tarea } from "../models/Tarea";
import type { EstadoTarea } from "../models/Tarea";

let data: string | null = localStorage.getItem("tareaSeleccionada");
let tarea: Tarea | null = null;

if (data) {
	tarea = JSON.parse(data);
}

if (tarea) (document.getElementById("titulo") as HTMLInputElement).value = tarea.titulo;
if (tarea) (document.getElementById("descripcion") as HTMLInputElement).value = tarea.descripcion;
if (tarea) (document.getElementById("estado") as HTMLInputElement).value = tarea.estado;
if (tarea) (document.getElementById("fechaCreacion") as HTMLInputElement).value = tarea.fechaCreacion;

(window as any).editar = function() {
	let tareaEditada = new Tarea (
		tarea ? tarea.id : -1,
		tarea ? (document.getElementById("titulo") as HTMLInputElement).value : undefined,
		tarea ? (document.getElementById("descripcion") as HTMLInputElement).value : undefined,
		tarea ? (document.getElementById("estado") as HTMLInputElement).value as EstadoTarea : undefined,
		tarea ? (document.getElementById("fechaCreacion") as HTMLInputElement).value : undefined
	);

	let tareas: Tarea[] = JSON.parse(localStorage.getItem("tareas") || "[]");

	tareas.forEach((t: Tarea, i: number) => {
		if (t.id === (tarea ? tarea.id : undefined)) {
			tareas[i] = tareaEditada;
		}
	});

	localStorage.setItem("tareas", JSON.stringify(tareas));
	console.log("got here");
	window.location.href = "index.html";
	console.log("got there");
}
