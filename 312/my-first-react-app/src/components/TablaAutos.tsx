import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Auto from '../models/Auto';
import AutosService from '../services/AutosService';
import RenglonTablaAutos from './RenglonTablaAutos';

export default function TablaAutos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [autos, setAutos] = useState<Auto[]>([]);
    const navigate = useNavigate();

    async function cargarAutos() {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                navigate('/inicioSesion');
                return;
            }

            const servicioAutos = new AutosService(tokenSesion);
            const listaAutos = await servicioAutos.obtenerLista();

            setAutos(listaAutos);
            setIsLoaded(true);
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/inicioSesion');
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarAutos();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
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
