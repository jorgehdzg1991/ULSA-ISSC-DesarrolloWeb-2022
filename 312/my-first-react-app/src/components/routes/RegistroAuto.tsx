import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import FormularioRegistroAuto from '../FormularioRegistroAuto';

export default function RegistroAuto() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Registrar Auto</h3>
                    <Link to="/autos">&lt; Regresar</Link>
                    <Card>
                        <Card.Body>
                            <FormularioRegistroAuto />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
