const model = require("../../../models")


export default async function (req, res) {
    let EventJson = await model.sequelize.models.events.findAll(
        {
            attributes: ['id', 'eventName', 'eventDate','image']
        }
    );
    //console.log(model.sequelize.models.events);
    console.log(EventJson);
    res.json({});
}