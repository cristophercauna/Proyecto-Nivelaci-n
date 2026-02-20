import { Usuario } from "./Usuario";

export class Multa{
    private fecha: Date;
    constructor(private usuario: Usuario,private monto: number,private motivo: string){
        this.fecha = new Date();
    }
    public getUsuario(): Usuario{
        return this.usuario;
    }
    public getMonto(): number{
        return this.monto;
    }
    public getMotivo(): string{
        return this.motivo;
    }
    public getFecha(): Date{
        return this.fecha;
    }
}