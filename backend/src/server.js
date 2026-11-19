import app from './app.js'
import pool from './database/connection.js'

const PORT = process.env.PORT || 3000

pool.getConnection()
    .then((conn)=>{
        console.log("Conectado no Mysql com Sucesso!")
        conn.release()
        app.listen(PORT, ()=> {console.log(`Api rodando na porta ${PORT} com sucesso!`)})
}).catch((err)=>{
    console.error('Erro ao conectar com MYSQL', err.message)
})

    