const model = require("../../../models")
const nodemailer = require("nodemailer");
import {AuthMiddleware} from '../AuthMiddleware';
async function sendEmail(to,subject,message){
    console.log(process.env.EMAIL_HOST)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure:true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW
        }
    });
    let email = await transporter.sendMail({
        from:'"Family List App"<no-reply@familylistapp.com>',
        to:'',
        bcc:to,
        subject:subject,
        html:message,
        text:message
    });
    return email;
    console.log("Message sent! "+email.messageId);
}
export default async function (req, res) {
    
    let authorized = await AuthMiddleware(req,res);
    if(!authorized){
        return res.json({authorized:false})
    }
    if(req.method === "POST"){
        let postObj = JSON.parse(req.body);
        let keys = Object.keys(postObj);
            let body = postObj["message"];
            let eventData = await model.sequelize.models.events.findOne({
                where:{
                    id:postObj["eventID"]
                },
                include:[{
                    model:model.sequelize.models.user,
                    as:'Givers',
                    attributes:['email']
                    
                },
                {
                    model:model.sequelize.models.user,
                    as:'Recievers',
                    attributes:['email']
                    
                }
                ]
        
            });
            
            let givers = eventData.dataValues.Givers;
            let recievers = eventData.dataValues.Recievers;
            let emailTo = [];
            givers.forEach(g=>{
                
                emailTo.push(g.dataValues.email);
            });
            recievers.forEach(r=>{
                
                emailTo.push(r.dataValues.email);
            });           
            
            let to = emailTo;
            console.log(emailTo);
            let subject = postObj["subject"];
            let emailResult = await sendEmail(to,subject,body);
            console.log(emailResult);
        res.json({authorized:true,result:emailResult});
        return;
    }

    res.json({});
}