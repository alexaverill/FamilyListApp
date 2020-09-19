var jwt = require('jsonwebtoken');
export function generateToken(user){
    var u = {
        username:user
    }
    return jwt.sign(u,process.env.KEY,{
        expiresIn:60*60*24
    });
}
export function validateToken(token){
    if(token == undefined){
        return false
    }
    token = token.trim();
    let val;
    try{
     val = jwt.verify(token,process.env.KEY);
    }catch(e){
        return false;
    }
    return true;
}
