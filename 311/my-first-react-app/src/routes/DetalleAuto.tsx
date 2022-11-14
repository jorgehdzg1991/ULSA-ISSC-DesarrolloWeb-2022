import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Auto from '../models/Auto';
import AutosService from '../services/AutosService';
import FormularioActualizarAuto from '../components/FormularioActualizarAuto';

export default function DetalleAuto() {
    const { idAuto } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [auto, setAuto] = useState<Auto | undefined>(undefined);

    async function loadAuto() {
        const id = parseInt(idAuto as string);

        if (isNaN(id)) {
            navigate('/autos');
            return;
        }

        try {
            const servicioAutos = new AutosService();
            const autoEncontrado = await servicioAutos.obtenerPorId(id);
            setAuto(autoEncontrado);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                // do nothing
            } else {
                window.alert('Ha ocurrido un error desconocido.');
                navigate('/autos');
                return;
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
        return (
            <>
                <h3>Error 404: Auto no encontrado.</h3>
            </>
        );
    }

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>{auto.modelo}</h3>
                    <Link to="/autos">&lt; Regresar</Link>
                    <FormularioActualizarAuto auto={auto} />
                </Col>
            </Row>
        </>
    );
}
