const model = require("../../../models")
const nodemailer = require("nodemailer");
import {AuthMiddleware} from '../AuthMiddleware';
async function sendEmail(emailBody, message){
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
        to:"alford60@ethereal.email",
        subject:"Test Email",
        text:"This is a test"
    });
    console.log("Message sent! "+email.messageId);
}
export default async function (req, res) {
    sendEmail("","");
    // let authorized = await AuthMiddleware(req,res);
    // if(!authorized){
    //     return res.json({authorized:false})
    // }
    // if(req.method === "POST"){
    
    // }

    res.json({});
}