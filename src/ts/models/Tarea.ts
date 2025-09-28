export type EstadoTarea = "pendiente" | "en curso" | "completada";
import { BaseModel } from "./BaseModel.js";

export class Tarea extends BaseModel {
	private titulo: string = "Nueva tarea";
	private descripcion: string = "Aquí va la descripción de tu nueva tarea";
	private estado: EstadoTarea = "pendiente";
	private fechaCreacion: string = "";

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

	static fromJSON(data: any): Tarea {
		return new Tarea(
			data.id,
			data.titulo,
			data.descripcion,
			data.estado,
			data.fechaCreacion
		);
	}

	selfUpdate(tareas: Tarea[]) {
		tareas.forEach((t: Tarea, i: number) => {
			if (t.id === (this ? this.id : undefined)) {
				tareas[i] = this;
			}
		});
	}

	// Getters
	get getId(): number {
		return this.id;
	}

	get getTitulo(): string {
		return this.titulo;
	}

	get getDescripcion(): string {
		return this.descripcion;
	}

	get getEstado(): EstadoTarea {
		return this.estado;
	}

	get getFechaCreacion(): string {
		return this.fechaCreacion;
	}

	// Setters
	set setTitulo(titulo: string) {
		this.titulo = titulo;
	}

	set setDescripcion(descripcion: string) {
		this.descripcion = descripcion;
	}

	set setEstado(estado: EstadoTarea) {
		this.estado = estado;
	}

	set setFechaCreacion(fechaCreacion: string) {
		this.fechaCreacion = fechaCreacion;
	}

}
