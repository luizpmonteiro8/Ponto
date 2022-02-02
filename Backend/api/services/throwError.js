module.exports = () => {
  const setError = (e) => {
    console.log(e);
    if (e.message?.includes('violates unique')) {
      throw Error('Duplicado');
    }
    if (e.detail?.includes('is not present in table')) {
      throw Error('Cadastro não encontrado!');
    }
    if (e.detail?.includes('still referenced from table')) {
      throw Error('Cadastro em uso!');
    }
    if (e.message?.includes('O id')) {
      throw Error(e.message);
    }
    throw Error(e);
  };
  return setError;
};
