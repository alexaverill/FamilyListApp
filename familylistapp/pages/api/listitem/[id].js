const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
      if(req.method == 'POST'){
        let itemOBJ = JSON.parse(req.body);
        let item = await model.sequelize.models.list_item.update(itemOBJ,{
          where:{
            id:itemOBJ.id
          }
        });
        return res.json(item);
      }
      //implement updating!
}