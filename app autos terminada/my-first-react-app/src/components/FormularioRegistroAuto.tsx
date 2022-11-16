import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import Auto from '../models/Auto';
import RegistrarAutoTask from '../tasks/RegistrarAutoTask';

export default function FormularioRegistroAuto() {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [submarca, setSubmarca] = useState('');
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();

    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'modelo':
                setModelo(valor);
                break;
            case 'marca':
                setMarca(valor);
                break;
            case 'submarca':
                setSubmarca(valor);
                break;
            case 'precio':
                setPrecio(parseFloat(valor));
        }
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const autoPorRegistrar = new Auto(
                undefined,
                modelo,
                marca,
                submarca,
                precio
            );

            const registrarAutoTask = new RegistrarAutoTask(
                autoPorRegistrar
            );

            await registrarAutoTask.execute();

            toast(`"${modelo}" creado exitosamente!`, { type: 'success' });

            navigate('/autos');
        } catch (e) {
            const mensajeError = (e as Error).message;

            switch (mensajeError) {
                case 'ErrorSesionExpiradaOInvalida':
                    localStorage.removeItem('tokenSesion');
                    navigate('/inicioSesion');
                    break;
                case 'ErrorFormularioIncompleto':
                    toast(
                        'Olvidaste llenar todos los campos del formulario',
                        { type: 'warning' }
                    );
                    break;
                case 'ErrorModeloDuplicado':
                    toast(
                        'Ya existe un auto con el mismo modelo',
                        { type: 'error' }
                    );
                    break;
                default:
                    toast(
                        'Ha ocurrido un error desconocido',
                        { type: 'error' }
                    );
            }
        }
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Card>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label htmlFor="txtModelo">
                                Modelo
                            </Form.Label>
                            <Form.Control
                                id="txtModelo"
                                type="text"
                                name="modelo"
                                value={modelo}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtMarca">
                                Marca
                            </Form.Label>
                            <Form.Control
                                id="txtMarca"
                                type="text"
                                name="marca"
                                value={marca}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtSubmarca">
                                Submarca
                            </Form.Label>
                            <Form.Control
                                id="txtSubmarca"
                                type="text"
                                name="submarca"
                                value={submarca}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtPrecio">
                                Precio
                            </Form.Label>
                            <Form.Control
                                id="txtPrecio"
                                type="number"
                                name="precio"
                                value={precio}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit" variant="primary">
                            <FontAwesomeIcon icon={faSave} />&nbsp;
                            Registrar
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}
