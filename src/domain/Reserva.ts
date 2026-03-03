import { Usuario } from "./Usuario";
import { RecursoBiblioteca, EstadoRecurso } from "./RecursoBiblioteca";

export class Reserva{
    private fechaReserva: Date;
    constructor(private usuario: Usuario,private recurso: RecursoBiblioteca){
    if (this.recurso.getEstado() !== EstadoRecurso.PRESTADO) {
        throw new Error("Solo se puede reservar un recurso que este prestado");
    }
        this.fechaReserva = new Date();
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
