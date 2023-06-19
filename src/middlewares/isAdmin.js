export const isAdmin = (req, res, next) =>{
    if(req.session.info.admin) next()
    else res.status(401).json({message:"no autorizado"})

}