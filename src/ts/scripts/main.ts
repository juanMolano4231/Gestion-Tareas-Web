import { Tarea } from "../models/Tarea.js";
import { TareasController } from "./TareasController.js";

if (!TareasController.hasTareas()) {
	TareasController.createSample();
}
