import axios, { AxiosError } from 'axios';
import Auto from '../models/Auto';

interface AutoConFormatoDelBackend {
    id: number;
    modelo: string;
    marca: string;
    submarca: string;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class AutosService {
    private tokenSesion: string;

    private baseUrl: string;

    public constructor(tokenSesion: string) {
        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/autos';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Auto[]> {
        try {
            const respuesta = await axios.get(
                this.baseUrl,
                { headers: this.headers }
            );

            const listaAutos = respuesta.data.map(
                (auto: AutoConFormatoDelBackend) => (
                    new Auto(
                        auto.id,
                        auto.modelo,
                        auto.marca,
                        auto.submarca,
                        auto.precio,
                        new Date(auto.fechaCreacion),
                        new Date(auto.fechaActualizacion)
                    )
                )
            );

            return listaAutos;
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }
}
