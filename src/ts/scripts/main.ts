import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";

// Crea una lista default de tareas si no existe ninguna
if (!TareasController.hasTareas()) {
	TareasController.createSample();
}
