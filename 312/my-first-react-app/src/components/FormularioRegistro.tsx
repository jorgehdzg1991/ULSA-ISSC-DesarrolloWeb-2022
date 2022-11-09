import { FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import RegistrarUsuarioTask from '../tasks/RegistrarUsuarioTask';

export default function FormularioRegistro() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [verificarPassword, setVerificarPassword] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const registrarUsuarioTask = new RegistrarUsuarioTask({
                nombreCompleto,
                nombreUsuario,
                password,
                verificarPassword
            });

            await registrarUsuarioTask.execute();

            navigate('/autos');
        } catch (e) {
            switch ((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Olvidaste completar todos los campos del formulario');
                    break;
                case 'ErrorPasswordsNoCoinciden':
                    window.alert('Las passwords no coinciden');
                    break;
                case 'ErrorNombreUsuarioDuplicado':
                    window.alert('El nombre de usuario que seleccionaste ya existe');
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    function handleNombreCompletoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorNombreCompleto = event.target.value;
        setNombreCompleto(valorNombreCompleto);
    }

    function handleNombreUsuarioChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handlePasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    function handleVerificarPasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorVerificarPassword = event.target.value;
        setVerificarPassword(valorVerificarPassword);
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="txtNombreCompleto">
                        Nombre Completo:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreCompleto"
                        id="txtNombreCompleto"
                        value={nombreCompleto}
                        onChange={handleNombreCompletoChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtNombreUsuario">
                        Nombre Usuario:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreUsuario"
                        id="txtNombreUsuario"
                        value={nombreUsuario}
                        onChange={handleNombreUsuarioChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtPassword">
                        Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="txtPassword"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtVerificarPassword">
                        Verificar Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="verificarPassword"
                        id="txtVerificarPassword"
                        value={verificarPassword}
                        onChange={handleVerificarPasswordChange}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Registrar
                </Button>
            </Form>
        </>
    );
}
