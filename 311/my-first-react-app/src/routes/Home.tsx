import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Home() {
    return (
        <>
            <h1>This is the home page</h1>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}
