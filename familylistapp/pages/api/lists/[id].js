const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
      let item = await model.sequelize.models.lists.findAll({
        where:{
          id:id
        },
        include:[
            {
                model:model.sequelize.models.list_item,
                attributes:['id']
            }
        ]
      });
      console.log(item);
      return res.json(item);
      //implement updating!
}