import { Usuario } from "./Usuario";
import { RecursoBiblioteca, EstadoRecurso } from "./RecursoBiblioteca";

export class Reserva{
    private fechaReserva: Date;
    constructor(private usuario: Usuario,private recurso: RecursoBiblioteca){
    if (this.recurso.getEstado() !== EstadoRecurso.DISPONIBLE) {
        throw new Error("El recurso no está disponible");
    }
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
