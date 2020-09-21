const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
      if(req.method == 'POST'){
        let itemOBJ = JSON.parse(req.body);
        let item = await model.sequelize.models.list_item.update(itemOBJ,{
          where:{
            id:id
          }
        });
        return res.json(item);
      }else if(req.method == 'DELETE'){
        await model.sequelize.models.list_item.destroy({
          where:{
            id:id
          }
        });
      }
      let item = model.sequelize.models.list_item.findAll({
        where:{
          id:id
        }
      });
      return res.json(item);
      //implement updating!
}