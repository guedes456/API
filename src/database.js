import mysql from "mysql2";

const conexao = mysql.createConnection({
  host: "localhost",
  user: "root", // ALTERE AQUI
  password: "", // ALTERE AQUI
  database: "api",
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(""),
  },
  // Forçar o uso do plugin de autenticação padrão
  authSwitchHandler: function (data, cb) {
    if (data.pluginName === "mysql_native_password") {
      cb(null, Buffer.from(""));
    } else {
      cb(new Error("Plugin de autenticação não suportado: " + data.pluginName));
    }
  },
});

conexao.connect((erro) => {
  if (erro) {
    console.error("Erro ao conectar com MariaDB:", erro.message);
    return;
  }
  console.log("Conectado ao MariaDB com sucesso!");
});

export default conexao;
