const model = require("../../../models")
import {AuthMiddleware,AdminAuthMiddleware} from '../AuthMiddleware';
const bcrypt = require('bcrypt');
export default async function (req, res) {
    
    const {
        query: { id },
      } = req
      let authorized = await AuthMiddleware(req,res);
      if(!authorized){
          return res.json({authorized:false})
      }
      if(req.method === "DELETE"){
        let adminAuthorized = await AdminAuthMiddleware(req,res);
        if(!adminAuthorized){
            return res.json({authorized:false})
        }
         let deletedUser= await model.sequelize.models.user.destroy({
             where:{
                 id:id
             }
         });
         return res.json({authorized:true,data:deletedUser});
      }else if(req.method==="POST"){
        let adminAuthorized = await AdminAuthMiddleware(req,res);
        if(!adminAuthorized){
            return res.json({authorized:false})
        }
        let userObj = JSON.parse(req.body);
        let updatedUser = {};
        if("password" in userObj){
            let saltRounds = 10;
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
                idAdmin:userObj.isAdmin,
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
            isAdmin:userObj.isAdmin,
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
        
            attributes: ['id', 'username','email','isAdmin'],
            
        }
    );
    
    res.json(Users);

    }
}
