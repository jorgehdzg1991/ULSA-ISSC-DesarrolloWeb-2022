import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaAutos from '../TablaAutos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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
                        <FontAwesomeIcon icon={faPlusCircle} />&nbsp;
                        Registrar Auto
                    </Button>
                </div>
                <TablaAutos />
            </div>
        </>
    );
}
