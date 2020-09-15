const model = require("../../../models")

function createEvent(){

}
export default async function (req, res) {
    if(req.method === "POST"){
        let dataObj = JSON.parse(req.body);
        console.log(dataObj);
        let eventData = {
            eventName:dataObj.name,
            eventDate: dataObj.date,
            comments:dataObj.comments,
            
        }
        let event = await model.sequelize.models.events.create(eventData);
        let give = await event.setGivers(dataObj.giving);
        let recieve = await event.setRecievers(dataObj.recieving)
        return res.json(event);
    }
    console.log(model.sequelize.models.events.associations);
    let EventJson = await model.sequelize.models.events.findAll(
        {
            attributes: ['id', 'eventName', 'eventDate','image'],
            
            include:['Givers']
        }
        
    );
    //console.log(model.sequelize.models.events);
    console.log(EventJson);
    res.json(EventJson);
}