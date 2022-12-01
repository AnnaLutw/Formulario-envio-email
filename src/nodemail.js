const mailer = require("nodemailer");
const express = require('express');
const cors = require('cors');
require("dotenv").config();
module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        host: 'smtp-mail.outlook.com', //informe o smtp do seu email
        port: 587,
        secure: false, //SSL/TLS
        auth: {
            user: 'seu email',
            pass: 'sua senha'
        }
    })
    
    const mail = {
        from: "seu email",
        to: email,
        subject: nome +' enviou uma mensagem',
        text: mensagem
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}