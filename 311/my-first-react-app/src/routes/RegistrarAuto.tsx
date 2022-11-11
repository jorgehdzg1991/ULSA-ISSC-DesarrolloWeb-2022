import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormularioRegistrarAuto from '../components/FormularioRegistrarAuto';

export default function RegistrarAuto() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Registrar Auto</h3>
                    <Link to="/autos">&lt; Regresar</Link>
                    <FormularioRegistrarAuto />
                </Col>
            </Row>
        </>
    );
}
