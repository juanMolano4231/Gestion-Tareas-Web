import { GruposController } from "./GruposController.js";

//Crea un grupo nuevo
(window as any).crearGrupo = function() {
    const inputNombre = document.getElementById("nombre") as HTMLInputElement;
    const nombre = inputNombre.value.trim();
    if (!nombre) return alert("Debes escribir un nombre");

    GruposController.add(nombre);

    alert(`Grupo "${nombre}" creado con éxito`);
    inputNombre.value = "";
    window.location.href = "ver-tareas.html";
}
