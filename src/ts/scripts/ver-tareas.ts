import { Tarea } from "../models/Tarea.js";

let data: string | null = localStorage.getItem("tareas");
let tareas: Tarea[] = data ? JSON.parse(data) : [];

tareas.forEach((t: Tarea) => {
	const h2 = document.createElement("h2");
	h2.textContent =
		`Id: ${t.id} | ` +
		`Título: ${t.titulo} | ` +
		`Descripción: ${t.descripcion} | ` +
		`Estado: ${t.estado} | ` +
		`Creación: ${t.fechaCreacion}`;
	
	h2.style.cursor = "pointer";
	h2.addEventListener("click", () => {
		localStorage.setItem("tareaSeleccionada", JSON.stringify(t));
		window.location.href = "editar-tarea.html";
	});
	document.body.appendChild(h2);
});
