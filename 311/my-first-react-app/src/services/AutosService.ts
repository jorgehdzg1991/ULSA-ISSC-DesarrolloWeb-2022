import axios, { AxiosError } from 'axios';
import Auto from '../models/Auto';

interface AutoApiObject {
    id: number;
    modelo: string;
    marca: string;
    submarca: string;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class AutosService {
    private readonly tokenSesion: string;

    private readonly baseUrl: string;

    public constructor() {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorNoHaySesion');
        }

        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/autos';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Auto[]> {
        const respuesta = await axios.get(this.baseUrl, { headers: this.headers });
        const listaAutos = respuesta.data.map((auto: AutoApiObject) => (
            new Auto(
                auto.id,
                auto.modelo,
                auto.marca,
                auto.submarca,
                auto.precio,
                new Date(auto.fechaCreacion),
                new Date(auto.fechaActualizacion)
            )
        ));
        return listaAutos;
    }

    public async obtenerPorId(id: number): Promise<Auto> {
        try {
            const respuesta = await axios.get(
                `${this.baseUrl}/${id}`,
                { headers: this.headers }
            );
    
            const {
                modelo,
                marca,
                submarca,
                precio,
                fechaCreacion,
                fechaActualizacion
            } = respuesta.data as AutoApiObject;
    
            return new Auto(
                id,
                modelo,
                marca,
                submarca,
                precio,
                new Date(fechaCreacion),
                new Date(fechaActualizacion)
            );
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status === 404) {
                    throw new Error('ErrorAutoNoEncontrado');
                }
            }

            throw e;
        }
    }

    public async registrar(auto: Auto): Promise<Auto> {
        const respuesta = await axios.post(
            this.baseUrl,
            auto,
            { headers: this.headers }
        );

        const {
            id,
            modelo,
            marca,
            submarca,
            precio,
            fechaCreacion,
            fechaActualizacion
        } = respuesta.data;

        const nuevoAuto = new Auto(
            id,
            modelo,
            marca,
            submarca,
            precio,
            new Date(fechaCreacion),
            new Date(fechaActualizacion)
        );

        return nuevoAuto;
    }
}
