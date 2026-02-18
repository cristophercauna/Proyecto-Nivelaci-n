export class Categoria {
    constructor(
        private id: number,
        private nombre: string
    ) {}

    public getNombre(): string {
        return this.nombre;
    }

    public getId(): number {
        return this.id;
    }
}