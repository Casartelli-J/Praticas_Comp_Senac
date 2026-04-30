import { Router } from 'express';
import * as convidado from '../controllers/convidados.controllers.js';


export const convidadoRouter = Router();

convidadoRouter.get('/', convidado.listUser);
convidadoRouter.post('/', convidado.insertUser);
convidadoRouter.put('/:id', convidado.updateUser);
convidadoRouter.delete('/:id', convidado.deleteUser);