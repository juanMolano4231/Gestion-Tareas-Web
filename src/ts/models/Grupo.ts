import { BaseModel } from "./BaseModel.js";

export class Grupo extends BaseModel {
	private nombre: string = "Nuevo grupo";

	constructor(id: number, nombre?: string) {
		super(id);
		this.id = id;
		if (nombre) this.nombre = nombre;
	}

	static fromJSON(data: any): Grupo {
		return new Grupo(
			data.id,
			data.nombre
		);
	}

	// Getters
	get getId(): number {
		return this.id;
	}

	get getNombre(): string {
		return this.nombre;
	}

	// Setters
	set setNombre(nombre: string) {
		this.nombre = nombre;
	}
}
