const model = require("../../../models")


export default async function (req, res) {
    let Users = await model.sequelize.models.user.findAll(
        {
            attributes: ['id', 'username']
        }
    );
    //console.log(model.sequelize.models.events);
    //console.log(Users);
    res.json(Users);
}