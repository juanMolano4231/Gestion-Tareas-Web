import { BaseModel } from "./BaseModel.js";
export class Grupo extends BaseModel {
    constructor(id, nombre) {
        super(id);
        this.nombre = "Nuevo grupo";
        this.id = id;
        if (nombre)
            this.nombre = nombre;
    }
    static fromJSON(data) {
        return new Grupo(data.id, data.nombre);
    }
    // Getters
    get getId() {
        return this.id;
    }
    get getNombre() {
        return this.nombre;
    }
    // Setters
    set setNombre(nombre) {
        this.nombre = nombre;
    }
}
