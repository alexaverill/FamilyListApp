import events from "../../../models/events";

var eventModel = require("../../../models/events");


export default async function (req, res) {
    let EventJson = await eventModel.findAll(
        {
            attributes: ['id', 'eventName', 'eventDate','image']
        }
    );
    console.log(EventJson);
    res.json(EventJson);
}