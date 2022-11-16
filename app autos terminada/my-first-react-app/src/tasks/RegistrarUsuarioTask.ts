import AuthenticationService from '../services/AuthenticationService';

interface DatosFormularioRegistroUsuario {
    nombreCompleto: string;
    nombreUsuario: string;
    password: string;
    verificarPassword: string;
}

export default class RegistrarUsuarioTask {
    private datosFormularioRegistroUsuario: DatosFormularioRegistroUsuario;

    public constructor(
        datosFormularioRegistroUsuario: DatosFormularioRegistroUsuario
    ) {
        this.datosFormularioRegistroUsuario =
            datosFormularioRegistroUsuario;
    }

    public async execute(): Promise<void> {
        this.validarDatosFormulario();
        const tokenSesion = await this.registrarUsuario();
        localStorage.setItem('tokenSesion', tokenSesion);
    }

    private async registrarUsuario(): Promise<string> {
        const servicioAutenticacion = new AuthenticationService();

        const {
            nombreCompleto,
            nombreUsuario,
            password
        } = this.datosFormularioRegistroUsuario;

        const tokenSesion = servicioAutenticacion.registrarUsuario({
            nombreCompleto,
            nombreUsuario,
            password
        });

        return tokenSesion;
    }

    private validarDatosFormulario(): void {
        const {
            nombreCompleto,
            nombreUsuario,
            password,
            verificarPassword
        } = this.datosFormularioRegistroUsuario;

        if (
            !nombreCompleto
            || !nombreUsuario
            || !password
            || !verificarPassword
        ) {
            throw new Error('ErrorFormularioIncompleto');
        }

        if (password !== verificarPassword) {
            throw new Error('ErrorPasswordsNoCoinciden');
        }
    }
}
