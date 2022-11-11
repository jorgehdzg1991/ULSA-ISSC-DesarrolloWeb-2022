import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaAutos from '../TablaAutos';
import './scss/ListaAutos.scss';

export default function ListaAutos() {
    const navigate = useNavigate();

    function navegarARegistroAutos() {
        navigate('/autos/registrar');
    }

    return (
        <>
            <div className="lista-autos">
                <div className="encabezado">
                    <h3>Autos Disponibles</h3>
                    <Button
                        variant="primary"
                        onClick={navegarARegistroAutos}
                    >
                        Registrar Auto
                    </Button>
                </div>
                <TablaAutos />
            </div>
        </>
    );
}
