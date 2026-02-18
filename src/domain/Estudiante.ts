import { Usuario } from "./Usuario";

export class Estudiante extends Usuario {

    public obtenerLimitePrestamos(): number{
        return 3;
    }
}
