import { Tarea } from "../models/Tarea.js";
import type { EstadoTarea } from "../models/Tarea.js";

const tareas: Tarea[] = JSON.parse(localStorage.getItem("tareas")!) || [];

function generarId(): number {
	if (tareas.length === 0) return 1;
	return Math.max(...tareas.map(t => t.id)) + 1;
}

(window as any).crear = function () {
	const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
	const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
	const estado = (document.getElementById("estado") as HTMLInputElement).value as EstadoTarea;

	const nuevaTarea = new Tarea(
		generarId(),
		titulo,
		descripcion,
		estado,
		new Date().toISOString().split("T")[0]
	);

	tareas.push(nuevaTarea);
	localStorage.setItem("tareas", JSON.stringify(tareas));

	window.location.href = "ver-tareas.html";
};
