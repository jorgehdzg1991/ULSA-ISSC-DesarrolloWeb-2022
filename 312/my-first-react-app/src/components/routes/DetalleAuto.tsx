import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Auto from '../../models/Auto';
import AutosService from '../../services/AutosService';

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
                        window.alert('Auto no encontrado');
                        navigate('/autos');
                        return;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                        navigate('/autos');
                        return;
                }
            }
        }

        setIsLoaded(true);
    }

    if (!isLoaded) {
        return <>Loading...</>;
    }

    return (
        <>
            {idAuto}
        </>
    );
}
