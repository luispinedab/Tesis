import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Aspirantes}from '../entity/Aspirante';
const nodemailer  = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service:'gmail',
    auth:{
        user:'alejokpb2021@gmail.com',
        pass:'alejokonglove'
    },
    tls: {
        rejectUnauthorized: false
    }
}))
var exito:any;
var bcrypt = require('bcryptjs');
export const getAspirantes = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Aspirantes).find();
    return res.json(results);
};
export const getAspirante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Aspirantes).findOne(req.params.id);
    return res.json(results);
};
export const createAspirante = async(req:Request,res:Response):Promise<Response>=>{
    const mailoptions = {
        from: 'alejokpb2021@gmail.com',
        to: `${req.body.Correo}`,
        subject: 'Usuario creado con éxito',
        html: `<h1>Usuario Nuevo</h1>
        <p>Hola ${req.body.Nombres} tu usuario fue creado con éxito</p>
        <p>User: ${req.body.Documento}</p>
        <p>Password: ${req.body.Documento}</p>
        `
    };
    transporter.sendMail(mailoptions, function(err:any, info:any) {
        if (err) {
            console.log(err)

           exito= res.json({ exito: false });
        } else {
            console.log(info);
            exito = res.json({ exito: true });
        }

    });
    req.body.Password= req.body.Documento.toString();
    var hashpassword=bcrypt.hashSync(req.body.Password,8);
     req.body.Password=hashpassword;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    req.body.FechaCreacion= dateTime;
    req.body.FechaModificacion= dateTime;
    req.body.Nickname= req.body.Documento;
    req.body.UserState=0;
     const newUser = getRepository(Aspirantes).create(req.body);
     const results = await getRepository(Aspirantes).save(newUser);
     console.log("Guardado",req.body);
     return exito;
     
};
export const updateAspirante = async(req:Request,res:Response):Promise<Response>=>{
    req.body.Password= req.body.Password.toString();
    var hashpassword=bcrypt.hashSync(req.body.Password,8);
     req.body.Password=hashpassword;
     var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    req.body.FechaModificacion= dateTime;
    const user = await getRepository(Aspirantes).findOne(req.params.id);
    if (user){
        getRepository(Aspirantes).merge(user,req.body);
       const results =  await getRepository(Aspirantes).save(user);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteAspirante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Aspirantes).delete(req.params.id);
    return res.json(results);
};