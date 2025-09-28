class Usuario {
	private username: string = "defaultUsername";
	private contrasena: string = "default123";
	private email: string = "default@default.default";

	constructor(username?: string, contrasena?: string, email?: string) {
		if (username) this.username = username;
		if (contrasena) this.contrasena = contrasena;
		if (email) this.email = email;
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
}
