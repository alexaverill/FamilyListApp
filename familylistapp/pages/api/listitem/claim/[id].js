const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
      if(req.method == 'POST'){
        let itemOBJ = JSON.parse(req.body);
        let item = await model.sequelize.models.list_item.update({
            isClaimed:itemOBJ.isClaimed,
            claimedBy:itemOBJ.claimedBy
        },,{
          where:{
            id:id
          }
        });
        return res.json(item);
      }
      let item = model.sequelize.models.list_item.findAll({
        where:{
          id:id
        }
      });
      return res.json(item);
      //implement updating!
}