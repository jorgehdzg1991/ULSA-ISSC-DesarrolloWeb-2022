export default class Auto {
    public id: number;

    public modelo: string;

    public marca: string;

    public submarca: string;

    public precio: number;

    public fechaCreacion: Date;

    public fechaActualizacion: Date;

    public constructor(
        id: number | undefined,
        modelo: string,
        marca: string,
        submarca: string,
        precio: number,
        fechaCreacion?: Date,
        fechaActualizacion?: Date
    ) {
        this.id = id as number;
        this.modelo = modelo;
        this.marca = marca;
        this.submarca = submarca;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion as Date;
        this.fechaActualizacion = fechaActualizacion as Date;
    }
}
