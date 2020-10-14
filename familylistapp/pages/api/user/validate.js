const bcrypt = require('bcrypt');
const model = require("../../../models");
const tokenizer = require("../../../utils/token")
export default async function (req, res) {
    let jsonObj = JSON.parse(req.body);
    let usernameIn= jsonObj.username;
    let passwordIn = jsonObj.password;
    let userData = await model.sequelize.models.user.findAll({
        where:{
            username:usernameIn
        },
        attributes:['id','username','password']
    })
    console.log(userData);
    if(userData == null || userData == undefined || userData.length <=0){
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
    let returnVal;
    if(!result){
          returnVal= {valid:false};
    }else{
   let auth = tokenizer.generateToken(userData[0].username);
     returnVal = {
        valid:result,
        id:userData[0].id,
        username:userData[0].username,
        token:auth
    }
    }
    res.json(returnVal);
    return;
}