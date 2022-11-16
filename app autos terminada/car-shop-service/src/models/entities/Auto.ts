import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'autos' })
export default class Auto {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 120, nullable: false, unique: true })
    public modelo: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public marca: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public submarca: string;

    @Column({ type: 'double', nullable: false })
    public precio: number;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        modelo: string,
        marca: string,
        submarca: string,
        precio: number,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.modelo = modelo;
        this.marca = marca;
        this.submarca = submarca;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public async actualizar(
        modelo: string,
        marca: string,
        submarca: string,
        precio: number
    ): Promise<void> {
        this.modelo = modelo;
        this.marca = marca;
        this.submarca = submarca;
        this.precio = precio;
        this.fechaActualizacion = new Date();

        const repositorioUsuarios = await Auto.obtenerRepositorioAutos();

        try {
            await repositorioUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Auto[]> {
        const repositorioUsuarios = await Auto.obtenerRepositorioAutos();
        return repositorioUsuarios.find();
    }

    public static async buscarPorId(id: number): Promise<Auto> {
        const repositorioUsuarios = await Auto.obtenerRepositorioAutos();

        const auto = await repositorioUsuarios.findOneBy({ id });

        if (!auto) {
            throw new Error('ErrorAutoNoEncontrado');
        }

        return auto;
    }

    public static async registrar(
        modelo: string,
        marca: string,
        submarca: string,
        precio: number
    ): Promise<Auto> {
        const repositorioUsuarios = await Auto.obtenerRepositorioAutos();

        const fechaCreacion = new Date();

        const auto = new Auto(
            undefined,
            modelo,
            marca,
            submarca,
            precio,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(auto);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return auto;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioUsuarios = await Auto.obtenerRepositorioAutos();
        await repositorioUsuarios.delete(id);
    }

    private static async obtenerRepositorioAutos(): Promise<Repository<Auto>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Auto);
    }
}
