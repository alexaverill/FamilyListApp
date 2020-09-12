const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
    console.log("ID: "+id)
    let EventJson = await model.sequelize.models.events.findOne({
        where:{
            id:id
        },
        // include:[{
        //     model:Users,
        //     as:'Givers',
        //     attributes:['id','username']
            
        // },
        // {
        //     model:Users,
        //     as:'Receivers',
        //     attributes:['id','username']
            
        // },
        // {
        //     model:List,
        //     include:[{
        //         model:Users,
        //         attributes:['username']
        //     },
        //     {
        //         model:ListItems,
        //         attributes:['id']
        //     }]
        // }]

    });
    //console.log(model.sequelize.models.events);
   //sole.log(EventJson);
    res.json(EventJson);
}