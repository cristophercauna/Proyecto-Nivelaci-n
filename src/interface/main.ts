import promptSync from "prompt-sync";
import { BibliotecaService } from "../application/BibliotecaService";
import { Estudiante } from "../domain/Estudiante";
import { Docente } from "../domain/Docente";
import { Libro } from "../domain/Libro";
import { Categoria } from "../domain/Categoria";

const prompt = promptSync();
const biblioteca = new BibliotecaService();

const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";
const reset = "\x1b[0m";

let opcion: string;

do {
    console.clear();
    console.log(cyan + "╔══════════════════════════════╗");
    console.log(cyan + "║      SISTEMA BIBLIOTECA      ║");
    console.log(cyan + "╚══════════════════════════════╝" + reset);

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

    opcion = prompt(yellow + "\nSeleccione una opción: " + reset);

    switch (opcion) {
        case "1":
            console.log("\n" + cyan + "--- Registro de Usuario ---" + reset);
            const idUsuario = Number(prompt("ID: "));
            const nombre = prompt("Nombre: ");
            const tipo = prompt("Tipo (1=Estudiante, 2=Docente): ");

            try {
                if (tipo === "1") {
                    biblioteca.registrarUsuario(new Estudiante(idUsuario, nombre));
                } else {
                    biblioteca.registrarUsuario(new Docente(idUsuario, nombre));
                }
                console.log(green + "✔ Usuario registrado correctamente" + reset);
            } catch (error: any) {
                console.log(red + "❌ " + error.message + reset);
            }
            break;

        case "2":
            console.log("\n" + cyan + "--- Registro de Libro ---" + reset);
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
                console.log(green + "✔ Libro registrado correctamente" + reset);
            } catch (error: any) {
                console.log(red + "❌ " + error.message + reset);
            }
            break;

        case "3":
            console.log("\n" + cyan + "--- Préstamo de Libro ---" + reset);
            const idUserPrestamo = Number(prompt("ID Usuario: "));
            const idLibroPrestamo = Number(prompt("ID Libro: "));
            const mensaje = biblioteca.prestarPorId(idUserPrestamo, idLibroPrestamo);
            console.log(mensaje.includes("exitosamente") ? green + "✔ " + mensaje + reset : red + "❌ " + mensaje + reset);
            break;

        case "4":
            console.log("\n" + cyan + "=== LISTA DE USUARIOS ===" + reset);
            biblioteca.listarUsuarios().forEach(u =>
                console.log(`👤 ID: ${u.getId()} - Nombre: ${u.getNombre()}`)
            );
            break;

        case "5":
            console.log("\n" + cyan + "=== LISTA DE RECURSOS ===" + reset);
            biblioteca.listarRecursos().forEach(r =>
                console.log(`📚 ID: ${r.getId()} - Título: ${r.getTitulo()} - Estado: ${r.getEstado()}`)
            );
            break;

        case "6":
            const idLibroDevolver = Number(prompt("ID Libro: "));
            console.log(biblioteca.devolverPorId(idLibroDevolver));
            break;

        case "7":
            const idUserReserva = Number(prompt("ID Usuario: "));
            const idRecursoReserva = Number(prompt("ID Recurso: "));
            const recurso = biblioteca.listarRecursos().find(r => r.getId() === idRecursoReserva);
            if (recurso){
                console.log("Estado del recurso:", recurso.getEstado());
                console.log("¿Disponible?:", recurso.estaDisponible() ? green + "✔ Sí" + reset : red + "❌ No" + reset);
            }
            console.log(biblioteca.reservarPorId(idUserReserva, idRecursoReserva));
            break;

        case "8":
            const idUserMulta = Number(prompt("ID Usuario: "));
            console.log(biblioteca.pagarMultaPorId(idUserMulta));
            break;

        case "9":
            const idUserPrestamos = Number(prompt("ID Usuario: "));
            console.log(biblioteca.listarPrestamosPorUsuario(idUserPrestamos));
            break;

        case "10":
            const idUserMultas = Number(prompt("ID Usuario: "));
            console.log(biblioteca.listarMultasPorUsuario(idUserMultas));
            break;

        case "11":
            const idUser = Number(prompt("ID Usuario: "));
            const idLibroSimular = Number(prompt("ID Libro: "));
            const dias = Number(prompt("Días de retraso: "));
            console.log(biblioteca.forzarVencimientoPrestamo(idUser, idLibroSimular, dias));
            break;

        case "12":
            console.log(green + "Saliendo del sistema... ¡Hasta luego! 👋" + reset);
            break;       

        default:
            console.log(red + "❌ Opción inválida" + reset);
    }

    prompt("\nPresione Enter para continuar...");

} while (opcion !== "12");