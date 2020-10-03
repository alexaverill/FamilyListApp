const model = require("../../../models")
const nodemailer = require("nodemailer");
import {AuthMiddleware} from '../AuthMiddleware';
async function sendEmail(to,subject,message){
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'alford60@ethereal.email',
            pass: 'Mbrv5dJ1EfDYrADsbT'
        }
    });
    let email = await transporter.sendMail({
        from:'"Testing mcTester"<test@mctester.com>',
        to:to,
        bcc:to,
        subject:subject,
        html:message,
        text:message
    });
    console.log("Message sent! "+email.messageId);
}
export default async function (req, res) {
    
    let authorized = await AuthMiddleware(req,res);
    if(!authorized){
        return res.json({authorized:false})
    }
    if(req.method === "POST"){
        let postObj = JSON.parse(req.body);
        let body = postObj["message"];
        if(body.indexOf("$$")>0){
            body.replace("$$",);
        }
        let to = postObj["to"];
        let subject = postObj["subject"];
        sendEmail(to,subject,body);
    }

    res.json({});
}