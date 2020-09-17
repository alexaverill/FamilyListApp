const bcrypt = require('bcrypt');
const model = require("../../../models");

export default async function (req, res) {
    let userData = await Users.findAll({
        where:{
            username:usernameIn
        },
        attributes:['id','username','password']
    })
    if(userData == null || userData == undefined){
        res.json({valid:false});
        return;
    }
    let passwordHash = userData[0].password;
    if(passwordHash == null){
        res.json({valid:false});
        return;
        
    }
    //console.log(passwordHash);
    const result = await new Promise((resolve,reject)=>{
        bcrypt.compare(passwordIn, passwordHash, function(err, response) {
            if(err){
                reject(err);
            }
            resolve(response);
          }); 

    });
   
    let returnVal = {
        valid:result,
        id:userData[0].id,
        username:userData[0].username
    }
    res.json(returnVal);
    return;
}