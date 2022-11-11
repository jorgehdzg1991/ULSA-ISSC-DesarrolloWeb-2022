import Auto from '../models/Auto';
import AutosService from '../services/AutosService';

export default class RegistrarAutoTask {
    private auto: Auto;

    public constructor(auto: Auto) {
        this.auto = auto;
    }

    public async execute(): Promise<void> {
        this.validar();
        await new AutosService().registrar(this.auto);
    }

    private validar(): void {
        const { modelo, marca, submarca, precio } = this.auto;

        if (!modelo || !marca || !submarca || !precio) {
            throw new Error('ErrorFormularioIncompleto');
        }
    }
}
