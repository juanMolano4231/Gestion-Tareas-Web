
let data: string | null = localStorage.getItem("tareaSeleccionada");
let tarea: any = null;

if (data) {
	tarea = JSON.parse(data);
}

(document.getElementById("titulo") as HTMLInputElement).value = tarea.titulo;
(document.getElementById("descripcion") as HTMLInputElement).value = tarea.descripcion;
(document.getElementById("estado") as HTMLInputElement).value = tarea.estado;
(document.getElementById("fechaCreacion") as HTMLInputElement).value = tarea.fechaCreacion;

(window as any).editar = function() {
	let tareaEditada: any = {
		id: tarea.id,
		titulo: (document.getElementById("titulo") as HTMLInputElement).value,
		descripcion: (document.getElementById("descripcion") as HTMLInputElement).value,
		estado: (document.getElementById("estado") as HTMLInputElement).value,
		fechaCreacion: (document.getElementById("fechaCreacion") as HTMLInputElement).value
	};

	let tareas: any[] = JSON.parse(localStorage.getItem("tareas") || "[]");

	tareas.forEach((t: any, i: number) => {
		if (t.id === tarea.id) {
			tareas[i] = tareaEditada;
		}
	});

	localStorage.setItem("tareas", JSON.stringify(tareas));
	console.log("got here");
	window.location.href = "index.html";
	console.log("got there");
}
