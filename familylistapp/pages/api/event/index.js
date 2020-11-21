const model = require("../../../models")

import {AuthMiddleware} from '../AuthMiddleware';

export default async function (req, res) {
    let authorized = await AuthMiddleware(req,res);
    if(!authorized){
        return res.json({authorized:false})
    }
    if(req.method === "POST"){
        let dataObj = JSON.parse(req.body);
        if("id" in dataObj){
            let eventData = {
                id:dataObj.id,
                eventName:dataObj.name,
                eventDate:new Date(dataObj.date),
                comments:dataObj.comments,
                image:"/event_images/"+(Math.floor(Math.random() * 24)+1)+".jpg"
            }
            let update = await model.sequelize.models.events.update(eventData,{
                where:{
                  id:dataObj.id
                }
              });
             let event = await model.sequelize.models.events.findAll({where:{id:dataObj.id}});
             console.log(event);
            let give = await event[0].setGivers(dataObj.giving);
            let recieve = await event[0].setRecievers(dataObj.receiving)
            let data = {
                authorized:true,
                data:event
            }
            return res.json(data);
        }else{
            let eventData = {
                eventName:dataObj.name,
                eventDate:new Date(dataObj.date),
                comments:dataObj.comments,
                image:"/event_images/"+(Math.floor(Math.random() * 24)+1)+".jpg"
            }
            let event = await model.sequelize.models.events.create(eventData);
            let give = await event.setGivers(dataObj.giving);
            let recieve = await event.setRecievers(dataObj.receiving)
            let data = {
                authorized:true,
                data:event
            }
            return res.json(data);
        }
    }
    const {
        query: { id },
      } = req
    let dateTime = Date.now();
    let EventJson = await model.sequelize.models.events.findAll(
        {
            
            attributes: ['id', 'eventName', 'eventDate','image'],
            
            include:["Givers","Recievers"]
        }
        
    );
    //console.log(model.sequelize.models.events);
    let data = {
        authorized:true,
        data:EventJson
    }
    res.json(data);
    return;
    //}
}