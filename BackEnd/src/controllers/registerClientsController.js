import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer"
import crypto from "crypto"
 
import clientModel from "../models/Clients.js"
import {config} from "../config.js"
 
const registerClientsController = {}
registerClientsController.register = async (req, res) => {
    const {
        name,
        lastName,
        birthday,
        email,
        address,
        registrationDate,
        password,
        phoneNumber,
        dui,
        nitNumber,
        isVerified
    } = req.body
 
    try {
        const existingClient = await clientModel.findOne({email})
        if(existingClient){
            return res.json({message : "Already Exists"})
        }
 
        const passwordHash = await bcryptjs.hash(password, 10);
        const newClient = new clientModel({
            name,
            lastName,
            birthday,
            email,
            address,
            registrationDate,
            password : passwordHash,
            phoneNumber,
            dui : dui || null,
            nitNumber : nitNumber || null,
            isVerified : isVerified || null
        })
        await newClient.save()
 
        const verificationCode = crypto.randomBytes(6)
        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "2h"}
        )
        res.cookie("verificationToken", tokenCode, {maxAge : 2*60*60*1000})
 
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : config.nodemailer.user,
                pass : config.nodemailer.pass
            }
        })
 
        const mailOptions = {
            from : config.nodemailer.user,
            to : email,
            subject : "Verificación de correo",
            html : `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Verificación de Cuenta</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #007BFF;
                    }
                    p {
                        font-size: 16px;
                        color: #333333;
                    }
                    .verification-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #007BFF;
                        margin: 20px 0;
                    }
                    .footer {
                        margin-top: 30px;
                        font-size: 14px;
                        color: #aaaaaa;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h1>¡Verifica tu cuenta!</h1>
                    <p>Hola Chabacan,</p>
                    <p>Gracias por registrarte. Tu código de verificación es:</p>
                    <div class="verification-code">${verificationCode.toString('hex')}</div>
                    <p>Por favor, usa este código para completar el proceso de verificación.</p>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                    <div class="footer">
                        <p>Equipo de Soporte</p>
                    </div>
                </div>
            </body>
            </html>`
        };
 
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return res.json({message : "Error sending email" + error})
            }
            console.log("Email sended" + info)
        });
 
        res.json({message : "Client registered, Please verify your account with the code from your email"})
 
 
    } catch (error) {
        console.log(error)
    }
}
 
registerClientsController.verifyCodeEmail = async (req, res) =>{
    const {requireCode} = req.body;
    const token = req.cookie.verificationToken;
    try {
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {email, verificationCode: storedCode} = decoded;
 
        if(requireCode !== storedCode){
            return res.json({message : "Invalid code"})
        }
 
        const client = await clientModel.findOne({email})
        client.isVerified = true;
        await client.save();
 
        res.clearCookie("verificationToken")
        res.json({message : "Email verified successfuly"})
    } catch (error) {
        console.log(error)
    }
}
 
export default registerClientsController;