export function errorHandler(err,req,res,next){
    const statusCode = err.statusCode || 500
    const message = err.menssage || "Erro interno no servidor"

    return
}