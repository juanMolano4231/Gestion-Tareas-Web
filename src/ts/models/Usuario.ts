class Usuario {
	username: string = "defaultUsername";
	contrasena: string = "default123";
	email: string = "default@default.default";

	constructor(username?: string, contrasena?: string, email?: string) {
		if (username) this.username = username;
		if (contrasena) this.contrasena = contrasena;
		if (email) this.email = email;
	}
}