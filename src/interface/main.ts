import promptSync from "prompt-sync";
import { BibliotecaService } from "../application/BibliotecaService";
import { Estudiante } from "../domain/Estudiante";
import { Docente } from "../domain/Docente";
import { Libro } from "../domain/Libro";
import { Categoria } from "../domain/Categoria";

const prompt = promptSync();
const biblioteca = new BibliotecaService();

let opcion: string;

do {
    console.log("\n=== SISTEMA BIBLIOTECA ===");
    console.log("1. Registrar usuario");
    console.log("2. Registrar libro");
    console.log("3. Prestar libro");
    console.log("4. Listar usuarios");
    console.log("5. Listar recursos");
    console.log("6. Salir");

    opcion = prompt("Seleccione una opción: ");

    switch (opcion) {

        case "1":
            const idUsuario = Number(prompt("ID: "));
            const nombre = prompt("Nombre: ");
            const tipo = prompt("Tipo (1=Estudiante, 2=Docente): ");

            try {
                if (tipo === "1") {
                    biblioteca.registrarUsuario(new Estudiante(idUsuario, nombre));
                } else {
                    biblioteca.registrarUsuario(new Docente(idUsuario, nombre));
                }
                console.log("Usuario registrado correctamente ✔");
            } catch (error: any) {
                console.log(error.message);
            }
            break;

        case "2":
            const idLibro = Number(prompt("ID Libro: "));
            const titulo = prompt("Título: ");
            const autor = prompt("Autor: ");
            const paginas = Number(prompt("Número de páginas: "));
            const idCategoria = Number(prompt("ID Categoría: "));
            const nombreCategoria = prompt("Nombre Categoría: ");

            const categoria = new Categoria(idCategoria, nombreCategoria);
            const libro = new Libro(idLibro, titulo, categoria, autor, paginas);

            try {
                biblioteca.registrarRecurso(libro);
                console.log("Libro registrado correctamente ✔");
            } catch (error: any) {
                console.log(error.message);
            }
            break;

        case "3":
            const idUserPrestamo = Number(prompt("ID Usuario: "));
            const idLibroPrestamo = Number(prompt("ID Libro: "));

            const mensaje = biblioteca.prestarPorId(idUserPrestamo, idLibroPrestamo);
            console.log(mensaje);
            break;

        case "4":
            console.log("\n=== USUARIOS ===");
            biblioteca.listarUsuarios().forEach(u =>
                console.log(`ID: ${u.getId()} - Nombre: ${u.getNombre()}`)
            );
            break;

        case "5":
            console.log("\n=== RECURSOS ===");
            biblioteca.listarRecursos().forEach(r =>
                console.log(`ID: ${r.getId()} - Título: ${r.getTitulo()} - Estado: ${r.getEstado()}`)
            );
            break;

        case "6":
            console.log("Saliendo del sistema...");
            break;

        default:
            console.log("Opción inválida");
    }

} while (opcion !== "6");