export abstract class Usuario {
    protected id: number;
    protected nombre: string;

    constructor(id: number, nombre: string){
        this.id = id;
        this.nombre = nombre;
    }

    public getId(): number{
        return this.id;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public abstract obtenerLimitePrestamos(): number;
}
