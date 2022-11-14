import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import InicioSesion from './routes/InicioSesion';
import Registro from './routes/Registro';
import Autos from './routes/Autos';
import ListaAutos from './routes/ListaAutos';
import RegistrarAuto from './routes/RegistrarAuto';
import DetalleAuto from './routes/DetalleAuto';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to='/registro' />
      },
      {
        path: '/inicioSesion',
        element: <InicioSesion />
      },
      {
        path: '/registro',
        element: <Registro />
      }
    ]
  },
  {
    path: '/autos',
    element: <Autos />,
    children: [
      {
        path: '/autos',
        element: <ListaAutos />,
        index: true
      },
      {
        path: '/autos/registrar',
        element: <RegistrarAuto />
      },
      {
        path: '/autos/:idAuto',
        element: <DetalleAuto />
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
