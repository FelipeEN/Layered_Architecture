export function errorHandler(err,req,res,next){
    const statusCode = err.statusCode || 500
    const message = err.message || "Erro interno no servidor"

    return res.status(statusCode).json({
        status : "Error",
        message
    })
}