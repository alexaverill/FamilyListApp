const model = require("../../../models")
import {AuthMiddleware} from "../AuthMiddleware"

export default async function (req, res) {
    // let EventJson = await model.events.findAll(
    //     {
    //         attributes: ['id', 'eventName', 'eventDate','image']
    //     }
    // );
    //console.log(d)
    if(req.method === "POST"){
        let itemOBJ = JSON.parse(req.body);
        console.log("ITEM OBJ ");
        console.log(itemOBJ);
        console.log(model.sequelize.models.list_item);
        let item = await model.sequelize.models.list_item.create(itemOBJ);
        return res.json(item);
    }
    res.json({});
}