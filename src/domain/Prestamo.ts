import { RecursoBiblioteca,EstadoRecurso } from "./RecursoBiblioteca";
import { Usuario } from "./Usuario";
export class Prestamo{
    private fechaDevolucion?: Date;
    private fechaLimite : Date;
    constructor(private usuario:Usuario,private recurso: RecursoBiblioteca, private fechaPrestamo: Date){
        if(!recurso.estaDisponible()){
            throw new Error("Es recurso no esta disponible");
        }
        this.fechaLimite = new Date(fechaPrestamo);
        this.fechaLimite.setDate(this.fechaLimite.getDate() + this.recurso.obtenerDuracionPrestamo());
        this.recurso.cambiarEstado(EstadoRecurso.PRESTADO);
    }
    public marcarDevolucion(){
        if(this.fechaDevolucion){
            throw new Error("El prestamo ya fue devuelto");
        }
        this.fechaDevolucion = new Date();
        this.recurso.cambiarEstado(EstadoRecurso.DISPONIBLE); 
    }
    public estaDevuelto(): boolean {
        return this.fechaDevolucion !== undefined;
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