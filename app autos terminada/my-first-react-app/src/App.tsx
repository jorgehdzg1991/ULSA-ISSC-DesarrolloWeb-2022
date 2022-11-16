import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/routes/Home';
import Autos from './components/routes/Autos';
import RegistroUsuario from './components/routes/RegistroUsuario';
import InicioSesion from './components/routes/InicioSesion';
import ListaAutos from './components/routes/ListaAutos';
import RegistroAuto from './components/routes/RegistroAuto';
import DetalleAuto from './components/routes/DetalleAuto';
import 'react-toastify/dist/ReactToastify.css';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to="/registro" />
      },
      {
        path: '/registro',
        element: <RegistroUsuario />
      },
      {
        path: '/inicioSesion',
        element: <InicioSesion />
      }
    ]
  },
  {
    path: '/autos',
    element: <Autos />,
    children: [
      {
        path: '/autos',
        index: true,
        element: <ListaAutos />
      },
      {
        path: '/autos/registrar',
        element: <RegistroAuto />
      },
      {
        path: '/autos/:idAuto',
        element: <DetalleAuto />
      }
    ]
  }
]);

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={appRouter} />
    </>
  );
}
