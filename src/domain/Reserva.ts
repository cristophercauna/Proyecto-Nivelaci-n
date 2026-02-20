import { Usuario } from "./Usuario";
import { RecursoBiblioteca, EstadoRecurso } from "./RecursoBiblioteca";

export class Reserva{
    private fechaReserva: Date;
    constructor(private usuario: Usuario,private recurso: RecursoBiblioteca){
        this.fechaReserva = new Date();
        this.recurso.cambiarEstado(EstadoRecurso.RESERVADO);
    }
    public getUsuario(): Usuario{
        return this.usuario;
    }
    public getRecurso(): RecursoBiblioteca{
        return this.recurso;
    }
    public getFechaReserva(): Date{
        return this.fechaReserva;
    }
}