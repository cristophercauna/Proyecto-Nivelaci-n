import { RecursoBiblioteca } from "./RecursoBiblioteca";

export class Tesis extends RecursoBiblioteca{
    private autor: string;
    private anioPublicacion: number;

    constructor(id: number,titulo: string,categoria: string,autor: string,anioPublicacion: number){
        super(id, titulo, categoria);
        this.autor = autor;
        this.anioPublicacion = anioPublicacion;
    }

    public getAutor(): string{
        return this.autor;
    }

    public getAnioPublicacion(): number{
        return this.anioPublicacion;
    }

    public obtenerDuracionPrestamo(): number{
        return 5;
    }
}
