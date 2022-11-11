import Auto from '../models/Auto';
import AutosService from '../services/AutosService';

export default class RegistrarAutoTask {
    private auto: Auto;

    public constructor(auto: Auto) {
        this.auto = auto;
    }

    public async execute(): Promise<void> {
        this.validar();
        await this.registrarAuto();
    }

    private validar(): void {
        const { modelo, marca, submarca, precio } = this.auto;

        if (!modelo || !marca || !submarca || !precio) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async registrarAuto(): Promise<void> {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if (!tokenSesion) {
            throw new Error('ErrorSesionExpiradaOInvalida');
        }

        const servicioAutos = new AutosService(tokenSesion);
        await servicioAutos.registrar(this.auto);
    }
}
