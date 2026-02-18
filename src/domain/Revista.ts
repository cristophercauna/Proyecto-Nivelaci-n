import { RecursoBiblioteca } from "./RecursoBiblioteca";

export class Revista extends RecursoBiblioteca{
    private numeroEdicion: number;

    constructor(id: number,titulo: string,categoria: string,numeroEdicion: number){
        super(id, titulo, categoria);
        this.numeroEdicion = numeroEdicion;
    }

    public getNumeroEdicion(): number{
        return this.numeroEdicion;
    }

    public obtenerDuracionPrestamo(): number{
        return 3;
    }
}
