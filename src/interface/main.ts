import { BibliotecaService } from "../application/BibliotecaService";
import { Estudiante } from "../domain/Estudiante";
import { Docente } from "../domain/Docente";
import { Libro } from "../domain/Libro";
import { Categoria } from "../domain/Categoria";

const biblioteca = new BibliotecaService();

const categoriaProgramacion = new Categoria(1, "Programación");

const estudiante = new Estudiante(1, "Carlos");
const docente = new Docente(2, "Ana");

const libro1 = new Libro(1, "Clean Code", categoriaProgramacion, "Robert C. Martin", 450);
const libro2 = new Libro(2, "Estructuras de Datos", categoriaProgramacion, "Mark Allen Weiss", 600);

biblioteca.registrarUsuario(estudiante);
biblioteca.registrarUsuario(docente);

biblioteca.registrarRecurso(libro1);
biblioteca.registrarRecurso(libro2);

biblioteca.prestarRecurso(estudiante, libro1);
biblioteca.prestarRecurso(docente, libro2);

console.log("Sistema ejecutado correctamente");