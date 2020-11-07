const model = require("../../../models")
import {AuthMiddleware} from '../AuthMiddleware';
const bcrypt = require('bcrypt');
async function createUser(userObj){
    let saltRounds = 10;
    let hashedPassword = await new Promise((resolve,reject)=>{
        bcrypt.hash(userObj.password,saltRounds,(err,hash)=>{
            if(err){
               reject(err);
            }else{
                resolve(hash);
            }
        });
    });
    userObj.password = hashedPassword;
    let newUser = await model.sequelize.models.user.create(userObj);
    //console.log(newUser);
    return newUser;
}

export default async function (req, res) {
    let authorized = await AuthMiddleware(req,res);
    if(!authorized){
        return res.json({authorized:false})
    }
    if(req.method==="GET"){
        let Users = await model.sequelize.models.user.findAll(
            {
                attributes: ['id', 'username',"email","isAdmin"],
                order:[["id","ASC"]]
            }
            
        );
        res.json(Users);
        return;
    }else if(req.method === "POST"){
        let userObj = JSON.parse(req.body);
        let results = await createUser(userObj);
        results = results.dataValues;
        delete results.password;
        delete results.createdAt;
        delete results.updatedAt;
        delete results.birthdat;
        delete results.isAdmin;
        console.log(results);
        res.json(results);
        return;
    }

    //console.log(model.sequelize.models.events);
    //console.log(Users);
    
}