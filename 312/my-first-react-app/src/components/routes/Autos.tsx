import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../AppNavbar';

export default function Autos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                navigate('/inicioSesion');
            }

            setIsLoaded(true);
        }
    }, [isLoaded, navigate]);

    if (!isLoaded) {
        return <>Loading...</>;
    }

    return (
        <>
            <AppNavbar />
            <Outlet />
        </>
    );
}
