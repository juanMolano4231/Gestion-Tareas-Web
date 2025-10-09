import { Tarea } from "./Tarea.js"
import { Grupo } from "./Grupo.js"
export class Usuario {
	private username: string = "defaultUsername";
	private contrasena: string = "default123";
	private email: string = "default@default.default";
	private tareas: Tarea[] = [];
	private grupos: Grupo[] = [];

	constructor(username?: string, contrasena?: string, email?: string) {
		if (username) this.username = username;
		if (contrasena) this.contrasena = contrasena;
		if (email) this.email = email;

	}

	static fromJSON(data: any): Usuario {
		const usuario = new Usuario(
			data.username,
			data.contrasena,
			data.email
		);
		if (Array.isArray(data.tareas)) usuario.setTareas = data.tareas;
		if (Array.isArray(data.grupos)) usuario.setGrupos = data.grupos;
		return usuario;
	}

	selfUpdate(usuarios: Usuario[]) {
		usuarios.forEach((u: Usuario, i: number) => {
			if (u.getUsername === this.getUsername) {
				usuarios[i] = this;
			}
		});
	}

	// Getters
	get getUsername(): string {
		return this.username;
	}

	get getContrasena(): string {
		return this.contrasena;
	}

	get getEmail(): string {
		return this.email;
	}

	get getTareas(): Tarea[] {
		return this.tareas;
	}

	get getGrupos(): Grupo[] {
		return this.grupos;
	}

	// Setters
	set setUsername(username: string) {
		this.username = username;
	}

	set setContrasena(contrasena: string) {
		this.contrasena = contrasena;
	}

	set setEmail(email: string) {
		this.email = email;
	}

	set setTareas(tareas: Tarea[]) {
		this.tareas = tareas;
	}

	set setGrupos(grupos: Grupo[]) {
		this.grupos = grupos;
	}
}
