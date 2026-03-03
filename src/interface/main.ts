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
    console.log("6. Devolver libro");
    console.log("7. Reservar libro");
    console.log("8. Pagar multa");
    console.log("9. Listar préstamos");
    console.log("10. Listar multas");
    console.log("11. Forzar vencimiento de préstamo");
    console.log("12. Salir");

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
            biblioteca.listarUsuarios().forEach(u =>console.log(`ID: ${u.getId()} - Nombre: ${u.getNombre()}`));
            break;

        case "5":
            console.log("\n=== RECURSOS ===");
            biblioteca.listarRecursos().forEach(r => console.log(`ID: ${r.getId()} - Título: ${r.getTitulo()} - Estado: ${r.getEstado()}`));
            break;

        case "6":
            const idLibrO = Number(prompt("ID Libro: "));
            console.log(biblioteca.devolverPorId(idLibrO))
            break;
        case "7":
            const idUserReserva = Number(prompt("ID Usuario: "));
            const idRecursoReserva = Number(prompt("ID Recurso: "));
            const recurso = biblioteca.listarRecursos().find(r => r.getId() === idRecursoReserva);
            if (recurso){
                console.log("Estado del recurso:", recurso.getEstado());
                console.log("¿Está disponible?:", recurso.estaDisponible());
            }
            console.log(biblioteca.reservarPorId(idUserReserva, idRecursoReserva));
            break;
        case "8":
            const idUserMulta = Number(prompt("ID Usuario: "));
            console.log(biblioteca.pagarMultaPorId(idUserMulta));
            break;
        case "9":
            console.log("\n=== PRÉSTAMOS ===");
            biblioteca.listarPrestamos().forEach(p =>console.log(`Usuario: ${p.getUsuario().getNombre()} | Recurso: ${p.getRecurso().getTitulo()} | Devuelto: ${p.estaDevuelto()}`));
            break;
        case "10":
            console.log("\n=== MULTAS ===");
            biblioteca.listarMultas().forEach(m => console.log(`Usuario: ${m.getUsuario().getNombre()} | Estado: ${m.getEstado()}`));
            break;
        case "11":
            const idUser = Number(prompt("ID Usuario: "));
            const idLiBro = Number(prompt("ID Libro: "));
            const dias = Number(prompt("¿Cuántos días de retraso simular?: "));
            console.log(biblioteca.forzarVencimientoPrestamo(idUser, idLiBro, dias));
            break;
        case "12":
            console.log("Saliendo del sistema... ¡Hasta luego!");
            break;       
        default:
            console.log("Opción inválida");
    }
} while (opcion !== "12");