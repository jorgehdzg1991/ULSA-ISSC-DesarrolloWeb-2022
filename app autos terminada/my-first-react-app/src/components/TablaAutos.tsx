import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Auto from '../models/Auto';
import AutosService from '../services/AutosService';
import RenglonTablaAutos from './RenglonTablaAutos';
import Loader from './Loader';

export default function TablaAutos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [autos, setAutos] = useState<Auto[]>([]);
    const navigate = useNavigate();

    async function cargarAutos() {
        try {
            const servicioAutos = new AutosService();
            const listaAutos = await servicioAutos.obtenerLista();

            setAutos(listaAutos);
            setIsLoaded(true);
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/inicioSesion');
                return;
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarAutos();
        }
    });

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Submarca</th>
                        <th>Fecha Actualizacion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autos.map(auto => (
                            <RenglonTablaAutos
                                key={auto.id}
                                auto={auto}
                            />
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}
