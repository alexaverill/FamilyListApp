const model = require("../../../models")
const nodemailer = require("nodemailer");
import {AuthMiddleware} from '../AuthMiddleware';
async function sendEmail(to,subject,message){
    console.log(process.env.EMAIL_HOST)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW
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