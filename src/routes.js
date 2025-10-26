import {Router } from 'express'
import controllersProdutos from './controllers.produtos.js';
const routes = Router();

routes.get("/produto",controllersProdutos.Listar);

routes.post("/produto", controllersProdutos.Inserir);

routes.put("/produto", controllersProdutos.Editar);

routes.delete("/produto", controllersProdutos.Excluir);


export default routes;