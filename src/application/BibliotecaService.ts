import { Usuario } from "../domain/Usuario";
import { RecursoBiblioteca,EstadoRecurso } from "../domain/RecursoBiblioteca";
import { Prestamo } from "../domain/Prestamo";
import { Reserva } from "../domain/Reserva";
import { Multa,EstadoMulta } from "../domain/Multa";
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
    private obtenerPrestamosActivos(usuario: Usuario): Prestamo[]{
        return this.prestamos.filter(p =>p.getUsuario().getId() === usuario.getId() && !p.estaDevuelto());
    }
    private tieneMultasPendientes(usuario: Usuario): boolean{
        return this.multas.some(m =>m.getUsuario().getId() === usuario.getId() &&m.estaPendiente());
    }
    public prestarRecurso(usuario: Usuario, recurso: RecursoBiblioteca): void{
        if(this.tieneMultasPendientes(usuario)){
            throw new Error("El usuario tiene multas pendientes");
        }
        if (!recurso.estaDisponible()){
            throw new Error("El recurso no está disponible");
        }
        const prestamosActivos = this.obtenerPrestamosActivos(usuario);
        if (prestamosActivos.length >= usuario.obtenerLimitePrestamos()){
            throw new Error("Límite de préstamos alcanzado");
        }
        const prestamo = new Prestamo(usuario, recurso, new Date());
        this.prestamos.push(prestamo);
    }
    public devolverRecurso(recurso: RecursoBiblioteca): void {
    const prestamo = this.prestamos.find(p =>p.getRecurso().getId() === recurso.getId() && !p.estaDevuelto());
    if (!prestamo) {
        throw new Error("No existe préstamo para este recurso");
    }
    const estabaVencido = prestamo.estaVencido();
    prestamo.marcarDevolucion();
    if (estabaVencido) {
        const diasRetraso = this.calcularDiasRetraso(prestamo);
        const monto = diasRetraso * 5; // 5 por día ejemplo
        const multa = new Multa(prestamo.getUsuario(),monto,`Retraso de ${diasRetraso} día(s) en la devolución`);
        this.multas.push(multa);
        }
    }
    private calcularDiasRetraso(prestamo: Prestamo): number {
        const hoy = new Date();
        const fechaLimite = prestamo.getFechaLimite();
        const diferencia = hoy.getTime() - fechaLimite.getTime();
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias : 0;
    }
    public pagarMulta(usuario: Usuario): void{
    const multaPendiente = this.multas.find(m =>m.getUsuario().getId() === usuario.getId() &&m.estaPendiente());
    if (!multaPendiente){
        throw new Error("El usuario no tiene multas pendientes");
    }
    multaPendiente.pagar();
    }
}



