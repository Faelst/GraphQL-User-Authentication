const jwt = require("jwt-simple");
const { perfis: obterPerfis } = require("../Type/Usuario");

module.exports = {
  async getUsuarioLogado(usuario) {
    const perfis = await obterPerfis(usuario);
    const agora = Math.floor(Date.now() / 1000);
    const usuarioPayload = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map((u) => u.nome),
      iat: agora,
      exp: agora + 24 * 60 * 60,
    };
    const authSecret = process.env.APP_AUTH_SECRET;
    return {
      ...usuarioPayload,
      token: jwt.encode(usuarioPayload, authSecret),
    };
  },
};
