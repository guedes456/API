import servicesProdutos from "./services.produtos.js";

function Listar(req, res) {
    servicesProdutos.Listar((erro, resultados) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao listar produtos' });
            return;
        }
        res.status(200).json(resultados);
    });
}

function Inserir(req, res) {
    const { nome_produto, preco_produto } = req.body;
    
    servicesProdutos.Inserir(nome_produto, preco_produto, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao inserir produto' });
            return;
        }
        res.status(201).json(resultado[0]);
    });
}

function Editar(req, res) {
    const { cod_produto, nome_produto, preco_produto } = req.body;
    
    servicesProdutos.Editar(cod_produto, nome_produto, preco_produto, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao editar produto' });
            return;
        }
        res.status(200).json(resultado[0]);
    });
}

function Excluir(req, res) {
    const { cod_produto } = req.body;
    
    servicesProdutos.Excluir(cod_produto, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ erro: 'Erro ao excluir produto' });
            return;
        }
        res.status(200).json(resultado[0]);
    });
}

export default { Listar, Editar, Inserir, Excluir };