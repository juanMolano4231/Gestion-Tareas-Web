
let data = localStorage.getItem("tareaSeleccionada");
let tarea = null;

if (data) {
	tarea = JSON.parse(data);
}

document.getElementById("titulo").value = tarea.titulo;
document.getElementById("descripcion").value = tarea.descripcion;
document.getElementById("estado").value = tarea.estado;
document.getElementById("fechaCreacion").value = tarea.fechaCreacion;

function editar() {
	let tareaEditada = {
		id: tarea.id,
		titulo: document.getElementById("titulo").value,
		descripcion: document.getElementById("descripcion").value,
		estado: document.getElementById("estado").value,
		fechaCreacion: document.getElementById("fechaCreacion").value
	};

	let tareas = JSON.parse(localStorage.getItem("tareas")) || [];	

	tareas.forEach((t, i) => {
		if (t.id === tarea.id) {
			tareas[i] = tareaEditada;
		}
	});

	localStorage.setItem("tareas", JSON.stringify(tareas));

	window.location.href = "index.html";
}
