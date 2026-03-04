import fs from "fs";
import { Usuario } from "../domain/Usuario";

export class UsuarioRepository {
    private filePath = "./data/usuarios.json";

    constructor() {
        if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, "[]");
    }

    obtenerTodos(): Usuario[] {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
    }

    agregar(usuario: Usuario) {
        const usuarios = this.obtenerTodos();
        usuarios.push(usuario);
        fs.writeFileSync(this.filePath, JSON.stringify(usuarios, null, 2));
    }

    buscarPorId(id: number): Usuario | undefined {
        return this.obtenerTodos().find(u => u.getId() === id);
    }
}