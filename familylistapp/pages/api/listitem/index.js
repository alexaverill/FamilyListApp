const model = require("../../../models")
import {AuthMiddleware} from "../AuthMiddleware"

export default async function (req, res) {
    let authorized = await AuthMiddleware(req,res);
    if(!authorized){
        return res.json({authorized:false})
    }
    if(req.method === "POST"){
        let itemOBJ = JSON.parse(req.body);
        console.log(itemOBJ);
        let item = await model.sequelize.models.list_item.create(itemOBJ);
        let data = {
            authorized:true,
            data:item
        }
        return res.json(data);
    }
    res.json({});
}