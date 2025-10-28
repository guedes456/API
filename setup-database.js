import mysql from 'mysql2';

const conexaoSemDB = mysql.createConnection({
    host: 'localhost',
    user: 'root', // ALTERAR AQUI
    password: '' // ALTERAR AQUI
});

conexaoSemDB.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar com MySQL:', erro.message);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
    
    conexaoSemDB.query('CREATE DATABASE IF NOT EXISTS api', (erro, resultado) => {
        if (erro) {
            console.error('Erro ao criar database:', erro.message);
            return;
        }
        console.log('Database "api" criada/verificada com sucesso!');
        
        conexaoSemDB.query('USE api', (erro) => {
            if (erro) {
                console.error('Erro ao usar database:', erro.message);
                return;
            }
            
            conexaoSemDB.query('DROP TABLE IF EXISTS produtos', (erro) => {
                if (erro) {
                    console.error('Erro ao remover tabela antiga:', erro.message);
                    return;
                }
                
                const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS produto (
                        cod_produto INT AUTO_INCREMENT PRIMARY KEY,
                        nome_produto VARCHAR(100) NOT NULL,
                        preco_produto DECIMAL(10, 2) NOT NULL
                    )
                `;
                
                conexaoSemDB.query(createTableQuery, (erro, resultado) => {
                    if (erro) {
                        console.error('Erro ao criar tabela:', erro.message);
                        return;
                    }
                    console.log('Tabela "produto" criada com sucesso!');
                    
                    const insertQuery = `
                        INSERT INTO produto (nome_produto, preco_produto) VALUES
                        ('Notebook Dell Inspiron', 3499.90),
                        ('Mouse Logitech MX Master', 349.90),
                        ('Teclado Mecânico Redragon', 299.90),
                        ('Monitor LG 24 polegadas', 899.90),
                        ('Webcam Logitech C920', 449.90),
                        ('Headset HyperX Cloud', 399.90),
                        ('SSD Samsung 1TB', 549.90),
                        ('Memória RAM 16GB DDR4', 289.90),
                        ('Placa de Vídeo RTX 3060', 2299.90),
                        ('Processador Intel i5', 1199.90),
                        ('Gabinete Gamer RGB', 349.90),
                        ('Fonte 600W 80 Plus', 399.90),
                        ('Mouse Pad Gamer Grande', 79.90),
                        ('Cadeira Gamer Preta', 899.90),
                        ('Hub USB 7 Portas', 129.90)
                    `;
                    
                    conexaoSemDB.query(insertQuery, (erro, resultado) => {
                        if (erro) {
                            console.error('Erro ao inserir dados:', erro.message);
                            return;
                        }
                        console.log(`${resultado.affectedRows} produtos inseridos com sucesso!`);
                        
                        conexaoSemDB.query('SELECT * FROM produto', (erro, resultados) => {
                            if (erro) {
                                console.error('Erro ao consultar dados:', erro.message);
                                return;
                            }
                            console.log('\n=== PRODUTOS CADASTRADOS ===');
                            resultados.forEach(produto => {
                                console.log(`ID: ${produto.cod_produto} | ${produto.nome_produto} | R$ ${produto.preco_produto}`);
                            });
                            console.log('\nSetup do banco de dados concluído com sucesso!');
                            conexaoSemDB.end();
                        });
                    });
                });
            });
        });
    });
});
