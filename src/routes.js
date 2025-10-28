import { Router } from "express";
import controllersProdutos from "./controllers.produtos.js";
const routes = Router();

routes.get("/", controllersProdutos.Saude);
routes.get("/health", controllersProdutos.Saude);

routes.get("/produto/:id", controllersProdutos.BuscaPorId);

routes.get("/produtos", controllersProdutos.Listar);

routes.post("/produto", controllersProdutos.Inserir);

routes.put("/produto/:id", controllersProdutos.Editar);

routes.delete("/produto/:id", controllersProdutos.Excluir);

export default routes;
