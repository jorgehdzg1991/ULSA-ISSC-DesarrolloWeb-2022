import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaAutos from '../components/TablaAutos';
import './scss/ListaAutos.scss';

export default function ListaAutos() {
    const navigate = useNavigate();

    function navegarRegistrarAuto() {
        navigate('/autos/registrar');
    }

    return (
        <>
            <Container className="lista-autos">
                <div className="cabecera">
                    <h3 className="titulo">Autos</h3>
                    <Button
                        className="boton-registro"
                        variant="primary"
                        onClick={navegarRegistrarAuto}
                    >
                        Registrar Auto
                    </Button>
                </div>
                <TablaAutos />
            </Container>
        </>
    );
}
