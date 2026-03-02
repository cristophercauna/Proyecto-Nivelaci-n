import { Usuario } from "../domain/Usuario";
import { RecursoBiblioteca,EstadoRecurso } from "../domain/RecursoBiblioteca";
import { Prestamo } from "../domain/Prestamo";
import { Reserva } from "../domain/Reserva";
import { Multa,EstadoMulta } from "../domain/Multa";
import { error } from "node:console";
export class BibliotecaService {
    private usuarios: Usuario[] = [];
    private recursos: RecursoBiblioteca[] = [];
    private prestamos: Prestamo[] = [];
    private reservas: Reserva[] = [];
    private multas: Multa[] = [];

    public registrarUsuario(usuario: Usuario): void {
        if(this.usuarioRegistrado(usuario)){
            throw new Error("El usuario ya esta registrado")
        }
        this.usuarios.push(usuario);
    }
    public registrarRecurso(recurso: RecursoBiblioteca): void {
        if (this.recursoRegistrado(recurso)) {
            throw new Error("El recurso ya está registrado");
        }
        this.recursos.push(recurso);
    }
    private usuarioRegistrado(usuario: Usuario): boolean {
        return this.usuarios.some(u => u.getId() === usuario.getId());
    }

    private recursoRegistrado(recurso: RecursoBiblioteca): boolean {
        return this.recursos.some(r => r.getId() === recurso.getId());
    }
    private obtenerPrestamosActivos(usuario: Usuario): Prestamo[]{
        return this.prestamos.filter(p =>p.getUsuario().getId() === usuario.getId() && !p.estaDevuelto());
    }
    private tieneMultasPendientes(usuario: Usuario): boolean{
        return this.multas.some(m =>m.getUsuario().getId() === usuario.getId() &&m.estaPendiente());
    }
    private yaTienePrestado(usuario: Usuario, recurso: RecursoBiblioteca): boolean {
        return this.prestamos.some(p => p.getUsuario().getId() === usuario.getId() && p.getRecurso().getId() === recurso.getId() &&! p.estaDevuelto());
    }
     private yaReservado(usuario: Usuario, recurso: RecursoBiblioteca): boolean {
        return this.reservas.some(r => r.getUsuario().getId() === usuario.getId() && r.getRecurso().getId() === recurso.getId());
    }
    public prestarRecurso(usuario: Usuario, recurso: RecursoBiblioteca): void{
        if (!this.usuarioRegistrado(usuario)) {
            throw new Error("Usuario no registrado en el sistema");
        }
        if (!this.recursoRegistrado(recurso)) {
            throw new Error("Recurso no registrado en el sistema");
        }
        if(this.tieneMultasPendientes(usuario)){
            throw new Error("El usuario tiene multas pendientes");
        }
        if(this.yaTienePrestado(usuario,recurso)){
            throw new Error ("El usuario ya tiene este recurso prestado");
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
        const reserva = this.reservas.find(r => r.getRecurso().getId() === recurso.getId());
        if(reserva){
            this.prestarRecurso(reserva.getUsuario(), recurso);
            this.reservas = this.reservas.filter(r => r !== reserva);
        }
    }
    private calcularDiasRetraso(prestamo: Prestamo): number {
        const hoy = new Date();
        const fechaLimite = prestamo.getFechaLimite();
        const diferencia = hoy.getTime() - fechaLimite.getTime();
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias : 0;
    }
    public reservarRecurso(usuario: Usuario, recurso: RecursoBiblioteca): void {
        if(!this.usuarioRegistrado(usuario)){
            throw new Error("Usuario no registrado");
        }
        if(!this.recursoRegistrado(recurso)){
            throw new Error("Recurso no registrado");
        }
        if(this.yaTienePrestado(usuario, recurso)){
            throw new Error("El usuario ya tiene este recurso prestado");
        }
        if(this.yaReservado(usuario, recurso)){
            throw new Error("El usuario ya tiene una reserva para este recurso");
        }
        if(recurso.estaDisponible()){
            throw new Error("El recurso está disponible, no necesita reserva");
        }
        const reserva = new Reserva(usuario, recurso);
        this.reservas.push(reserva);
    }
    public pagarMulta(usuario: Usuario): void{
        const multaPendiente = this.multas.find(m =>m.getUsuario().getId() === usuario.getId() &&m.estaPendiente());
        if (!multaPendiente){
            throw new Error("El usuario no tiene multas pendientes");
        }
        multaPendiente.pagar();
    }
    public listarPrestamos(): Prestamo[]{
        return [...this.prestamos];
    }
    public listarMultas(): Multa[]{
        return [...this.multas];
    }
    public listarRecursos(): RecursoBiblioteca[]{
        return [...this.recursos];
    }
    public listarUsuarios(): Usuario[]{
        return [...this.usuarios];
    }
    public listarReservas(): Reserva[]{
        return [...this.reservas];
    }
}



