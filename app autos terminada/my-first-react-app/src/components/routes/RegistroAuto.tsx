import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import FormularioRegistroAuto from '../FormularioRegistroAuto';

export default function RegistroAuto() {
    return (
        <>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h3>Registrar Auto</h3>
                    <Link to="/autos">&lt; Regresar</Link>
                    <FormularioRegistroAuto />
                </Col>
            </Row>
        </>
    );
}
