import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faCar } from '@fortawesome/free-solid-svg-icons';

export default function AppNavbar() {
    const navigate = useNavigate();

    function cerrarSesion() {
        localStorage.removeItem('tokenSesion');
        navigate('/inicioSesion');
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/autos">
                        <FontAwesomeIcon icon={faCar} />&nbsp;
                        Autos
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={cerrarSesion}>
                            <FontAwesomeIcon icon={faRightFromBracket} />&nbsp;
                            Cerrar Sesion
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
