const appMiddleware = (req, res, next)=>{
    console.log("Inside app middleware");
    next();
}
module.exports = appMiddleware;