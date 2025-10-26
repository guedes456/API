import mysql from 'mysql2';

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ALTERE AQUI
    password: 'SENHA123',     // ALTERE AQUI
    database: 'api'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar com MariaDB:', erro.message);
        return;
    }
    console.log('Conectado ao MariaDB com sucesso!');
});

export default conexao;