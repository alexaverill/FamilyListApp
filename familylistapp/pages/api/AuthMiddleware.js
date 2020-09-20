const tokenizer = require("../../utils/token");
export function AuthMiddleware(req,res){
    let token = req.headers.authorization;
    //console.log("TOKEN: "+token);
    return new Promise((resolve,reject) =>{
        if(tokenizer.validateToken(token)){
            return resolve(true);
        }
        return resolve(false);
    })
}