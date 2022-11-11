import Auto from '../models/Auto';

interface RenglonTablaAutosProps {
    auto: Auto
}

export default function RenglonTablaAutos(
    { auto }: RenglonTablaAutosProps
) {
    return (
        <>
            <tr>
                <td>{auto.modelo}</td>
                <td>{auto.marca}</td>
                <td>{auto.submarca}</td>
                <td>{auto.fechaCreacion.toDateString()}</td>
            </tr>
        </>
    );
}
