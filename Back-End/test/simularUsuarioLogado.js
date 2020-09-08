const db = require('../config/db')
const { getUsuarioLogado } = require('../resolvers/JWT/usuario')

const sql = `
    select
        u.*
    from usuarios_perfis up
        inner join usuarios u on up.usuario_id = u.id
        inner join perfis p on p.id = up.perfil_id
    where u.ativo = 1
        and u.nome = :nomePerfil
    limit 1
`

const getUsuario = async nomePerfil => {
    const res = await db.raw(sql , { nomePerfil: nomePerfil})
    return res ? res[0][0] : null
}

module.exports = async req => {
    const usuario = await getUsuario('rafael')
    if(usuario){
        const {token} = await getUsuarioLogado(usuario)
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}