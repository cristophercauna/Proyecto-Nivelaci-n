import fs from "fs";
import { RecursoBiblioteca } from "../domain/RecursoBiblioteca";

export class LibroRepository {
    private filePath = "./data/libros.json";

    constructor() {
        if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, "[]");
    }

    obtenerTodos(): RecursoBiblioteca[] {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
    }

    agregar(libro: RecursoBiblioteca) {
        const libros = this.obtenerTodos();
        libros.push(libro);
        fs.writeFileSync(this.filePath, JSON.stringify(libros, null, 2));
    }

    buscarPorId(id: number): RecursoBiblioteca | undefined {
        return this.obtenerTodos().find(l => l.getId() === id);
    }
}