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
    let EventJson = await model.sequelize.models.events.findOne({
        where:{
            id:id
        },
        include:[{
            model:model.sequelize.models.user,
            as:'Givers',
            attributes:['id','username']
            
        },
        {
            model:model.sequelize.models.user,
            as:'Recievers',
            attributes:['id','username']
            
        },
        {
            model:model.sequelize.models.lists,
            include:[{
                model:model.sequelize.models.user,
                attributes:['username']
            },
            {
                model:model.sequelize.models.list_item,
                attributes:['id']
            }]
        }
        ]

    });
    let data={
        authorized:true,
        data:EventJson
    }
    res.json(data);
}