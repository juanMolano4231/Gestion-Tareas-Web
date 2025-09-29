import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";
import { GruposController } from "./GruposController.js";
import { Grupo } from "../models/Grupo.js";

// Se obtienen todas las tareas
let tareas: Tarea[] = TareasController.getTareas();

// Se obtienen todos los grupos
let grupos = GruposController.getGrupos();

// Se asegura que exista el grupo "Sin grupo" con id = 0
if (!grupos.some((g: Grupo) => g.getId === 0)) {
    grupos.unshift(new Grupo(0, "Sin grupo"));
}

// Se recorre cada grupo
grupos.forEach((g: any) => {
    // Se crea título del grupo
    const h1 = document.createElement("h1");
    const h1_2 = document.createElement("h1");
    h1.textContent = `Grupo: ${g.nombre}`;
    h1_2.textContent = `id: ${g.id}`;
    document.body.appendChild(h1);
    document.body.appendChild(h1_2);

    // Se filtran las tareas que pertenecen al grupo
    const tareasGrupo = tareas.filter(t => t.getGrupoId === g.id);

    // Se indica si el grupo no tiene tareas
    if (tareasGrupo.length === 0) {
        const p = document.createElement("p");
        p.textContent = "(sin tareas)";
        document.body.appendChild(p);
    }

    // Se listan las tareas del grupo
    tareasGrupo.forEach(t => {
        const h2 = document.createElement("h2");
        h2.textContent =
            `Id: ${t.getId} | ` +
            `Título: ${t.getTitulo} | ` +
            `Descripción: ${t.getDescripcion} | ` +
            `Estado: ${t.getEstado} | ` +
            `Creación: ${t.getFechaCreacion}`;

        // Listener para poder ver la tarea deseada
        h2.style.cursor = "pointer";
        h2.addEventListener("click", () => {
            localStorage.setItem("tareaSeleccionada", JSON.stringify(t));
            window.location.href = "editar-tarea.html";
        });
        document.body.appendChild(h2);
    });
});
