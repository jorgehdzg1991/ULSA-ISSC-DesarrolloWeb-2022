import { useNavigate } from 'react-router-dom';
import Auto from '../models/Auto';
import './scss/RenglonTablaAutos.scss';

interface RenglonTablaAutosProps {
    auto: Auto
}

export default function RenglonTablaAutos(
    { auto }: RenglonTablaAutosProps
) {
    const navigate = useNavigate();

    function navegarADetalleDeAuto() {
        navigate(`/autos/${auto.id}`);
    }

    return (
        <>
            <tr className="renglon-tabla-autos" onClick={navegarADetalleDeAuto}>
                <td>{auto.modelo}</td>
                <td>{auto.marca}</td>
                <td>{auto.submarca}</td>
                <td>{auto.fechaActualizacion.toDateString()}</td>
            </tr>
        </>
    );
}