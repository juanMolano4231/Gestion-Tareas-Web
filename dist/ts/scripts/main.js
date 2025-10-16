import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";
import { UsuarioController, exposeUsuarioControllerGlobals } from "./UsuarioController.js";
import { loadTareasFromAPI } from "./jsonPlaceHolder.js";
// Crea una lista default de tareas si no existe ninguna
if (!TareasController.hasTareas()) {
    TareasController.createSample();
    console.log("AAA");
}
UsuarioController.ensureDefault();
exposeUsuarioControllerGlobals();
loadTareasFromAPI().then(tareas => {
    tareas.forEach(t => console.log(`ID: ${t.getId}, Título: ${t.getTitulo}, Estado: ${t.getEstado}`));
});
