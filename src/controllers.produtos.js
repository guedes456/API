import servicesProdutos from "./services.produtos.js";

function Saude(req, res) {
  res.status(200).json("API está funcionando!");
}

function BuscaPorId(req, res) {
  const { id } = req.params;
  servicesProdutos.BuscaPorId(id, (erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: "Erro ao listar produtos" });
      return;
    }
    res.status(200).json(resultado);
  });
}

function Listar(req, res) {
  servicesProdutos.Listar((erro, resultados) => {
    if (erro) {
      res.status(500).json({ erro: "Erro ao listar produtos" });
      return;
    }
    res.status(200).json(resultados);
  });
}

function Inserir(req, res) {
  if (!req.body) {
    res.status(400).json({ erro: "nome_produto e preco_produto do produto são obrigatórios" });
    return;
  }

  if (!req.body.nome_produto) {
    res.status(400).json({ erro: "nome_produto é obrigatório" });
    return;
  }

  if (!req.body.preco_produto) {
    res.status(400).json({ erro: "preco_produto é obrigatório" });
    return;
  }

  const { nome_produto, preco_produto } = req.body;

  servicesProdutos.Inserir(nome_produto, preco_produto, (erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: "Erro ao inserir produto" });
      return;
    }
    res.status(201).json(resultado[0]);
  });
}

function Editar(req, res) {
  const { id } = req.params;

  if (!req.body) {
    res.status(400).json({ erro: "nome_produto e preco_produto são obrigatórios" });
    return;
  }

  const { nome_produto, preco_produto } = req.body;
  if (!nome_produto) {
    res.status(400).json({ erro: "nome_produto é obrigatório" });
    return;
  }

  if (!preco_produto) {
    res.status(400).json({ erro: "preco_produto é obrigatório" });
    return;
  }

  servicesProdutos.Editar(id, nome_produto, preco_produto, (erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: "Erro ao editar produto" });
      return;
    }
    res.status(200).json(resultado[0]);
  });
}

function Excluir(req, res) {
  const { id } = req.params;

  servicesProdutos.Excluir(id, (erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: "Erro ao excluir produto" });
      return;
    }
    res.status(200).json(resultado[0]);
  });
}

export default { Saude, BuscaPorId, Listar, Editar, Inserir, Excluir };
