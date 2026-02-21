import { Usuario } from "../domain/Usuario";
import { RecursoBiblioteca,EstadoRecurso } from "../domain/RecursoBiblioteca";
import { Prestamo } from "../domain/Prestamo";
import { Reserva } from "../domain/Reserva";
import { Multa } from "../domain/Multa";
export class BibliotecaService {
    private usuarios: Usuario[] = [];
    private recursos: RecursoBiblioteca[] = [];
    private prestamos: Prestamo[] = [];
    private reservas: Reserva[] = [];
    private multas: Multa[] = [];

    public registrarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }
    public registrarRecurso(recurso: RecursoBiblioteca): void {
        this.recursos.push(recurso);
    }
    private obtenerPrestamosActivos(usuario: Usuario): Prestamo[] {
        return this.prestamos.filter(p =>
            p.getUsuario().getId() === usuario.getId()
        );
    }
    public prestarRecurso(usuario: Usuario, recurso: RecursoBiblioteca): void {

        if (recurso.getEstado() !== EstadoRecurso.DISPONIBLE) {
            throw new Error("El recurso no está disponible");
        }

        const prestamosActivos = this.obtenerPrestamosActivos(usuario);

        if (prestamosActivos.length >= usuario.obtenerLimitePrestamos()) {
            throw new Error("Límite de préstamos alcanzado");
        }

        const prestamo = new Prestamo(usuario, recurso, new Date());
        this.prestamos.push(prestamo);
    }
    

}


