import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";
import { UsuarioController, exposeUsuarioControllerGlobals } from "./UsuarioController.js";
import { loadTareasFromAPI } from "./jsonPlaceHolder.js";

// Crea una lista default de tareas si no existe ninguna
if (!TareasController.hasTareas()) {
	TareasController.createSample();
}

UsuarioController.ensureDefault();
exposeUsuarioControllerGlobals();
