import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Home() {
    return (
        <>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}
