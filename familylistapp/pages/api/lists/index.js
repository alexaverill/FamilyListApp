const model = require("../../../models")
import {AuthMiddleware} from '../AuthMiddleware';

export default async function (req, res) {
    let authorized = await AuthMiddleware(req,res);
    if(!authorized){
        return res.json({authorized:false})
    }
    if(req.method === 'POST'){
        //create new list.
        let listOBJ = JSON.parse(req.body);
        console.log(listOBJ);
        let [list,created] = await model.sequelize.models.lists.findOrCreate({
            where:{eventId:listOBJ.id, userId:listOBJ.userID},
            defaults:{
                userId:listOBJ.userID,
                eventId:listOBJ.id
            },
            include:["list_items"]

        });
        console.log(list);
        return res.json(list);

    }
    res.json({});
}