if (!localStorage.getItem("tareas")) {
	const ejemplos = [
		{
			id: 1,
			titulo: "Comprar pan",
			descripcion: "Ir a la tienda y comprar pan fresco",
			estado: "pendiente",
			fechaCreacion: "2025-09-11"
		},
		{
			id: 2,
			titulo: "Estudiar JS",
			descripcion: "Repasar clases y objetos en JavaScript",
			estado: "en curso",
			fechaCreacion: "2025-09-10"
		},
		{
			id: 3,
			titulo: "Hacer ejercicio",
			descripcion: "Correr 30 minutos en el parque",
			estado: "completada",
			fechaCreacion: "2025-09-09"
		}
	];
	localStorage.setItem("tareas", JSON.stringify(ejemplos));
}
