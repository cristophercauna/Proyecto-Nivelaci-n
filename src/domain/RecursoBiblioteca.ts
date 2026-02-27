import { error } from "node:console";
import { Categoria } from "./Categoria";
export enum EstadoRecurso{
    DISPONIBLE = "DISPONIBLE",
    PRESTADO = "PRESTADO",
    RESERVADO = "RESERVADO",
    MANTENIMIENTO = "MANTENIMIENTO"

}
export abstract class RecursoBiblioteca{
    protected id: number;
    protected titulo: string;
    protected categoria: Categoria;
    protected estado: EstadoRecurso;

    constructor(id: number, titulo: string, categoria: Categoria){
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.estado = EstadoRecurso.DISPONIBLE;
    }

    public getId(): number{
        return this.id;
    }

    public getTitulo(): string{
        return this.titulo;
    }

    public getCategoria(): Categoria{
        return this.categoria;
    }

    public getEstado(): EstadoRecurso{
        return this.estado;
    }

    public cambiarEstado(nuevoEstado: EstadoRecurso): void{
        if(this.estado = nuevoEstado){
            throw new Error("El recurso ya tiene ese estado");
        }
    }
    public estaDisponible(): boolean{
        return this.estado === EstadoRecurso.DISPONIBLE;
    }
    
    public abstract obtenerDuracionPrestamo(): number;
}
