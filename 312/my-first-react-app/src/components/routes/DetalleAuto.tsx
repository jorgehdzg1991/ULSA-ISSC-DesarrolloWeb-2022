import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import Auto from '../../models/Auto';
import AutosService from '../../services/AutosService';
import FormularioActualizarAuto from '../FormularioActualizarAuto';
import { Link } from 'react-router-dom';

export default function DetalleAuto() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [auto, setAuto] = useState<Auto | undefined>(undefined);
    const navigate = useNavigate();
    const { idAuto } = useParams();

    async function loadAuto() {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                throw new Error('ErrorSesionExpiradaOInvalida');
            }

            const id = parseInt(idAuto as string);

            if (isNaN(id)) {
                navigate('/autos');
                return;
            }

            const servicioAutos = new AutosService(tokenSesion);
            const autoEncontrado = await servicioAutos.obtenerPorId(id);

            setAuto(autoEncontrado);
        } catch (e) {
            if (e instanceof Error) {
                switch (e.message) {
                    case 'ErrorSesionExpiradaOInvalida':
                        navigate('/inicioSesion');
                        return;
                    case 'ErrorAutoNoEncontrado':
                        break;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                        navigate('/autos');
                        return;
                }
            }
        }

        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadAuto();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    if (!auto) {
        return <h3>Error 404: Auto no encontrado.</h3>;
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{auto.modelo}</h3>
                    <Link to="/autos">&lt; Regresar</Link>
                    <Card>
                        <Card.Body>
                            <FormularioActualizarAuto auto={auto} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
