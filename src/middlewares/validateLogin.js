export const validateLogin = (req, res, next) =>{
    if(req.session.info.loggedIn) next()
    else res.status(401).json({message:"no autorizado"})

}