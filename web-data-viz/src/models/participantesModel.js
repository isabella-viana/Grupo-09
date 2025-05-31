module.exports = {
  listar: () => {
    return db.executar('SELECT * FROM usuario');
  },

  deletarPorIds: (ids) => {
    const idsString = ids.join(',');  // transforma array em string '1,2,3'
    return db.executar(`DELETE FROM usuario WHERE idUsuario IN (${idsString})`);
  },

  editar: (id, { email, telefone }) => {
    return db.executar(`UPDATE usuario SET email = '${email}', telefone = '${telefone}' WHERE idUsuario = ${id}`);
  }
};
