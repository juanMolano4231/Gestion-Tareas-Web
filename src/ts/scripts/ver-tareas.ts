import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";

let tareas: Tarea[] = TareasController.getTareas();

tareas.forEach((t: Tarea) => {
	const h2 = document.createElement("h2");
	h2.textContent =
		`Id: ${t.getId} | ` +
		`Título: ${t.getTitulo} | ` +
		`Descripción: ${t.getDescripcion} | ` +
		`Estado: ${t.getEstado} | ` +
		`Creación: ${t.getFechaCreacion}`;
	
	h2.style.cursor = "pointer";
	h2.addEventListener("click", () => {
		localStorage.setItem("tareaSeleccionada", JSON.stringify(t));
		window.location.href = "editar-tarea.html";
	});
	document.body.appendChild(h2);
});
