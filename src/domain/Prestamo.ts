import { RecursoBiblioteca,EstadoRecurso } from "./RecursoBiblioteca";
import { Usuario } from "./Usuario";
export class Prestamo{
    private fechaDevolucion?: Date;
    private fechaLimite : Date;
    constructor(private usuario:Usuario,private recurso: RecursoBiblioteca, private fechaPrestamo: Date){
        this.fechaLimite = new Date(fechaPrestamo);
        this.fechaLimite.getDate() + this.recurso.obtenerDuracionPrestamo();
        this.recurso.cambiarEstado(EstadoRecurso.PRESTADO);
    }
    public marcarDevolucion(){
        this.fechaDevolucion = new Date();
        this.recurso.cambiarEstado(EstadoRecurso.DISPONIBLE); 
    }
    public estaVencido(): boolean{
        const hoy = new Date();
        return !this.fechaDevolucion && hoy > this.fechaLimite;
    }
    public getUsuario(): Usuario{
        return this.usuario;
    }
    public getRecurso(): RecursoBiblioteca{
        return this.recurso;
    }
    public getFechaLimite(): Date{
        return this.fechaLimite;
    }
}