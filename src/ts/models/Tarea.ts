export type EstadoTarea = "pendiente" | "en curso" | "completada";
import { BaseModel } from "./BaseModel.js";

export class Tarea extends BaseModel {
	id: number;
	titulo: string = "Nueva tarea";
	descripcion: string = "Aquí va la descripción de tu nueva tarea";
	estado: EstadoTarea = "pendiente";
	fechaCreacion: string = "";

	constructor(
		id: number,
		titulo?: string,
		descripcion?: string,
		estado?: EstadoTarea,
		fechaCreacion?: string
	) {
		super(id);
		this.id = id;
		if (titulo) this.titulo = titulo;
		if (descripcion) this.descripcion = descripcion;
		if (estado) this.estado = estado;
		if (fechaCreacion) this.fechaCreacion = fechaCreacion;
	}
}
