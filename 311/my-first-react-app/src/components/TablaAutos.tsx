import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Auto from '../models/Auto';
import AutosService from '../services/AutosService';
import RenglonTablaAutos from './RenglonTablaAutos';

export default function TablaAutos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [autos, setAutos] = useState<Auto[]>([]);

    async function loadAutos() {
        const servicioAutos = new AutosService();
        const listaAutos = await servicioAutos.obtenerLista();
        setAutos(listaAutos);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            loadAutos();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    function renderAutos() {
        return autos.map(auto => (
            <RenglonTablaAutos key={auto.id} auto={auto} />
        ));
    }

    return (
        <>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Submarca</th>
                        <th>Fecha Creacion</th>
                    </tr>
                </thead>
                <tbody>
                    {renderAutos()}
                </tbody>
            </Table>
        </>
    );
}
