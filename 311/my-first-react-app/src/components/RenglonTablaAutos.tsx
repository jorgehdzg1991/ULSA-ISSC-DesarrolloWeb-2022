import { useNavigate } from 'react-router-dom';
import Auto from '../models/Auto';

interface RenglonTablaAutosProps {
    auto: Auto
}

export default function RenglonTablaAutos(
    { auto }: RenglonTablaAutosProps
) {
    const navigate = useNavigate();

    function navegarADetalleAuto() {
        navigate(`/autos/${auto.id}`);
    }

    return (
        <>
            <tr onClick={navegarADetalleAuto}>
                <td>{auto.modelo}</td>
                <td>{auto.marca}</td>
                <td>{auto.submarca}</td>
                <td>{auto.fechaCreacion.toDateString()}</td>
            </tr>
        </>
    );
}
