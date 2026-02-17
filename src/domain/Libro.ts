import { RecursoBiblioteca } from "./RecursoBiblioteca";

export class Libro extends RecursoBiblioteca {
    private autor: string;
    private numeroPaginas: number;
    constructor(id:number, titulo:string, categoria:string, autor: string,numeroPaginas:number){
        super(id, titulo, categoria);
        this.autor = autor;
        this.numeroPaginas = numeroPaginas;
    }
    public getAutor():string{
        return this.autor;
    }
    public obtenerDuracionPrestamo(): number {
        return 7;
    }
}