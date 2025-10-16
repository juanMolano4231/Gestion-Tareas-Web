import { Tarea } from "../models/Tarea.js";
import type { EstadoTarea } from "../models/Tarea.js";

type JsonPlaceholderTodo = {
  id: number;
  title: string;
  completed: boolean;
};

export async function loadTareasFromAPI(): Promise<Tarea[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data: JsonPlaceholderTodo[] = await res.json();

  return data.map((d: JsonPlaceholderTodo) =>
    new Tarea(
      d.id,
      d.title,
      "",
      (d.completed ? "Cerrado" : "Pendiente") as EstadoTarea,
      "",
      0
    )
  );
}
