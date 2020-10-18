const model = require("../../../models")
import {AuthMiddleware} from '../AuthMiddleware';

export default async function (req, res) {
    
    const {
        query: { id },
      } = req
      let authorized = await AuthMiddleware(req,res);
      if(!authorized){
          return res.json({authorized:false})
      }
    if(req.method==="POST"){
        console.log(id);
        let userObj = JSON.parse(req.body);
        console.log(userObj);
        let updatedUser = await model.sequelize.models.user.update({
            username:userObj.username,
            email:userObj.email,
        },{
            where:{
              id:id
            }
          });
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
