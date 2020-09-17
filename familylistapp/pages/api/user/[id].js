const model = require("../../../models")


export default async function (req, res) {
    let Users = await model.sequelize.models.user.findAll({
        where:{
            id:req.body.id
        },
        
            attributes: ['id', 'username'],
            
        }
    );
    
    res.json(Users);
}