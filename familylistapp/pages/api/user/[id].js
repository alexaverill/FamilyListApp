const model = require("../../../models")
import {AuthMiddleware} from '../AuthMiddleware';
const bcrypt = require('bcrypt');
export default async function (req, res) {
    
    const {
        query: { id },
      } = req
      let authorized = await AuthMiddleware(req,res);
      if(!authorized){
          return res.json({authorized:false})
      }
    if(req.method==="POST"){
        
        let userObj = JSON.parse(req.body);
        console.log(userObj);
        let updatedUser = {};
        if("password" in userObj){
            let saltRounds = 10;
            console.log(userObj.password);
            let password = await new Promise((resolve,reject)=>{
                bcrypt.hash(userObj.password,saltRounds,(err,hash)=>{
                    if(err){
                       reject(err);
                    }else{
                        resolve(hash);
                    }
                });
            });
            updatedUser = await model.sequelize.models.user.update({
                username:userObj.username,
                email:userObj.email,
                password:password
            
            },{
                where:{
                  id:id
                }
              });
        }else{
            updatedUser = await model.sequelize.models.user.update({
            username:userObj.username,
            email:userObj.email,
        },{
            where:{
              id:id
            }
          });
        }
        
        console.log(updatedUser);
        let data = {
            authorized:true,
            data:updatedUser
        }
        res.json(data);
        return;
        
    }else{
    let Users = await model.sequelize.models.user.findAll({
        where:{
            id:id
        },
        
            attributes: ['id', 'username'],
            
        }
    );
    
    res.json(Users);

    }
}
