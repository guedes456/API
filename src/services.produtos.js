import conexao from "./database.js";

function BuscaPorId(id, callback) {
  const sql = "SELECT * FROM produto WHERE cod_produto = ?";

  conexao.query(sql, [id], (erro, resultados) => {
    callback(erro, resultados);
  });
}

function Listar(callback) {
  const sql = "SELECT * FROM produto";

  conexao.query(sql, [], (erro, resultados) => {
    callback(erro, resultados);
  });
}

function Inserir(nome_produto, preco_produto, callback) {
  const sql = "INSERT INTO produto (nome_produto, preco_produto) VALUES (?, ?)";

  conexao.query(sql, [nome_produto, preco_produto], (erro, resultado) => {
    if (erro) {
      callback(erro, null);
      return;
    }
    // Buscar o produto inserido
    conexao.query("SELECT * FROM produto WHERE cod_produto = ?", [resultado.insertId], (err2, rows) => {
      callback(err2, rows);
    });
  });
}

function Editar(cod_produto, nome_produto, preco_produto, callback) {
  const sql = "UPDATE produto SET nome_produto = ?, preco_produto = ? WHERE cod_produto = ?";

  conexao.query(sql, [nome_produto, preco_produto, cod_produto], (erro, resultado) => {
    if (erro) {
      callback(erro, null);
      return;
    }
    // Buscar o produto atualizado
    conexao.query("SELECT * FROM produto WHERE cod_produto = ?", [cod_produto], (err2, rows) => {
      callback(err2, rows);
    });
  });
}

function Excluir(cod_produto, callback) {
  // Buscar antes de excluir
  conexao.query("SELECT * FROM produto WHERE cod_produto = ?", [cod_produto], (erro, rows) => {
    if (erro) {
      callback(erro, null);
      return;
    }
    // Depois excluir
    conexao.query("DELETE FROM produto WHERE cod_produto = ?", [cod_produto], (err2) => {
      callback(err2, rows);
    });
  });
}

export default { BuscaPorId, Listar, Inserir, Editar, Excluir };
