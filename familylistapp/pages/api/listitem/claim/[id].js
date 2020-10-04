const model = require("../../../../models");
import {AuthMiddleware} from '../../AuthMiddleware';

export default async function (req, res) {
    const {
        query: { id },
      } = req
      let authorized = await AuthMiddleware(req,res);
      if(!authorized){
          return res.json({authorized:false})
      }
      if(req.method == 'POST'){
        let itemOBJ = JSON.parse(req.body);
        let item = await model.sequelize.models.list_item.update({
            isClaimed:itemOBJ.isClaimed,
            claimedBy:itemOBJ.claimedBy
        },{
          where:{
            id:id
          }
        });
        let data = {
          authorized:true,
          data:item
        }
        return res.json(data);
      }

      let item = await model.sequelize.models.list_item.findAll({
        where:{
          id:id
        }
      });
      let data = {
        authorized:true,
        data:item
      }
      return res.json(data);
      //implement updating!
}