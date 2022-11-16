import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Auto from '../models/entities/Auto';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    modelo: string;
    marca: string;
    submarca: string;
    precio: number;
}

export default class AutosController extends BaseController {
    protected initializeRouter(): void {
        this.router.all('*', Sesion.verificarTokenSesion);

        this.router.get('/', this.consultarTodos);
        this.router.get('/:id', this.buscarPorId);
        this.router.post('/', this.registrar);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.eliminar);
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const autos = await Auto.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(autos);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const auto = await Auto.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(auto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async registrar(req: Request, res: Response): Promise<void> {
        try {
            const {
                modelo,
                marca,
                submarca,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!modelo || !marca || !submarca || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoUsuario = await Auto.registrar(modelo, marca, submarca, precio);
    
            res.status(HttpStatusCodes.OK).json(nuevoUsuario);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un auto con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                modelo,
                marca,
                submarca,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!modelo || !marca || !submarca || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const auto = await Auto.buscarPorId(id);

            await auto.actualizar(modelo, marca, submarca, precio);
    
            res.status(HttpStatusCodes.OK).json(auto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorAutoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un auto con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const autos = await Auto.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(autos);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): AutosController {
        return new AutosController(app, '/autos');
    }
}
