import { useState, ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import Auto from '../models/Auto';

interface FormularioActualizarAutoProps {
    auto: Auto;
}

export default function FormularioActualizarAuto(
    { auto }: FormularioActualizarAutoProps
) {
    const [modelo, setModelo] = useState(auto.modelo);
    const [marca, setMarca] = useState(auto.marca);
    const [submarca, setSubmarca] = useState(auto.submarca);
    const [precio, setPrecio] = useState(auto.precio);

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

    return (
        <>
            <Form>
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
                <Button type="submit" variant="primary">
                    Actualizar
                </Button>
            </Form>
        </>
    );
}
