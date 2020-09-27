const model = require("../../../models")


export default async function (req, res) {
    const {
        query: { id },
      } = req
    let Users = await model.sequelize.models.user.findAll({
        where:{
            id:id
        },
        
            attributes: ['id', 'username'],
            
        }
    );
    
    res.json(Users);
}
