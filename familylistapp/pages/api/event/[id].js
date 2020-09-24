const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
    console.log("Event Associations: ");
    console.log(model.sequelize.models.events.associations);
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
    //console.log(model.sequelize.models.events);
   //sole.log(EventJson);
    res.json(EventJson);
}