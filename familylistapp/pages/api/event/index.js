const model = require("../../../models")
const tokenizer = require("../../../utils/token");
function createEvent(){

}
function runMiddleWare(req,res){
    let token = req.headers.authorization;
    console.log("TOKEN: "+token);
    return new Promise((resolve,reject) =>{
        if(tokenizer.validateToken(token)){
            return resolve(true);
        }
        return resolve(false);
    })
}
export default async function (req, res) {
    let authorized = await runMiddleWare(req,res);
    console.log("STATUS "+authorized);
    if(!authorized){
        console.log("UNAUTHORIZED");
        return res.json({authorized:false})
    }
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
            
            include:["Givers","Recievers"]
        }
        
    );
    //console.log(model.sequelize.models.events);
    console.log(EventJson);
    res.json(EventJson);
}