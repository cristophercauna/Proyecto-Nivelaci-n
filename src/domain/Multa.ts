import { Usuario } from "./Usuario";
export enum EstadoMulta {
    PENDIENTE,
    PAGADA
}
export class Multa{
    private fecha: Date;
    private estado: EstadoMulta;
    constructor(private usuario: Usuario,private monto: number,private motivo: string){
        this.fecha = new Date();
        this.estado= EstadoMulta.PENDIENTE;
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
    public estaPendiente(): boolean {
        return this.estado === EstadoMulta.PENDIENTE;
    }
}