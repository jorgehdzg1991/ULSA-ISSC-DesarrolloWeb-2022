import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Auto from '../models/Auto';
import RegistrarAutoTask from '../tasks/RegistrarAutoTask';

export default function FormularioRegistrarAuto() {
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [submarca, setSubmarca] = useState('');
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        
        try {
            const registrarAutoTask = new RegistrarAutoTask(
                new Auto(undefined, modelo, marca, submarca, precio)
            );
            await registrarAutoTask.execute();
            navigate('/autos');
        } catch (e) {
            switch((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Olvidaste llenar todos los campos del formulario');
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

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
                break;
            default:
                return;
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
                        <Button variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}
