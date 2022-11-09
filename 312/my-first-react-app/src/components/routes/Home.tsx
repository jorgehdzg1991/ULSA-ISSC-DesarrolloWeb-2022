import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Home() {
    return (
        <>
            <p>This is the home page</p>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}
