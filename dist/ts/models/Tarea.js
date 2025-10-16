import { BaseModel } from "./BaseModel.js";
export class Tarea extends BaseModel {
    constructor(id, titulo, descripcion, estado, fechaCreacion, grupoId) {
        super(id);
        this.titulo = "Nueva tarea";
        this.descripcion = "Aquí va la descripción de tu nueva tarea";
        this.estado = "pendiente";
        this.fechaCreacion = "";
        this.grupoId = 0;
        this.id = id;
        if (titulo)
            this.titulo = titulo;
        if (descripcion)
            this.descripcion = descripcion;
        if (estado)
            this.estado = estado;
        if (fechaCreacion)
            this.fechaCreacion = fechaCreacion;
        if (grupoId !== undefined)
            this.grupoId = grupoId; // !== permite que grupo 0 sea valido
    }
    static fromJSON(data) {
        var _a;
        return new Tarea(data.id, data.titulo, data.descripcion, data.estado, data.fechaCreacion, (_a = data.grupoId) !== null && _a !== void 0 ? _a : 0 // ?? significa: si el valor de grupoId en data es indefinido, grupoId sera 0
        );
    }
    selfUpdate(tareas) {
        tareas.forEach((t, i) => {
            if (t.id === (this ? this.id : undefined)) {
                tareas[i] = this;
            }
        });
    }
    // Getters
    get getId() {
        return this.id;
    }
    get getTitulo() {
        return this.titulo;
    }
    get getDescripcion() {
        return this.descripcion;
    }
    get getEstado() {
        return this.estado;
    }
    get getFechaCreacion() {
        return this.fechaCreacion;
    }
    // Setters
    set setTitulo(titulo) {
        this.titulo = titulo;
    }
    set setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    set setEstado(estado) {
        this.estado = estado;
    }
    set setFechaCreacion(fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    get getGrupoId() {
        return this.grupoId;
    }
    set setGrupoId(grupoId) {
        this.grupoId = grupoId;
    }
}
