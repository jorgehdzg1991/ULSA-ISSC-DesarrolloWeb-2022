import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from '../AppNavbar';
import Loader from '../Loader';

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
        return <Loader />;
    }

    return (
        <>
            <AppNavbar />
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
