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

      let item = await model.sequelize.models.lists.findAll({
        where:{
          id:id
        },
        include:[
            {
                model:model.sequelize.models.list_item
            },
            {
              model:model.sequelize.models.user,
              attributes:['username']
            },
            {
              model:model.sequelize.models.events
            }
        ]
      });
      console.log(item);
      let data = {
        authorized:true,
        data:item
      }
      return res.json(data);
      //implement updating!
}