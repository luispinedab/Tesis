import {json, Request,Response} from 'express';
import {getRepository,Repository}from 'typeorm';
import {User}from '../entity/Usuario';
import {Aspirantes}from '../entity/Aspirante';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config =require('../models/config');

export const login = async(req:Request,res:Response):Promise<Response>=> {
    var token;
    var nickname=req.body.Nickname;
    var password=req.body.Password;
    const authaspirante = await getRepository(Aspirantes).findOne({ Nickname: nickname });
    const authUser = await getRepository(User).findOne({ Nickname: nickname },{relations:['IDUserType']});
    if(authUser==null || bcrypt.compareSync(password, authUser.Password) != 1 || authUser.UserState==0)
    {  
        if(authaspirante==null|| bcrypt.compareSync(password, authaspirante.Password) != 1 )
        {
            return res.json({auth:false,Token:null,asp:false});
        }
        else
        {   
            var a=authaspirante.FechaCreacion.toString();
            var b=authaspirante.FechaModificacion.toString();
            token= jwt.sign({tipo:'Aspirante',cedula:authaspirante.Documento,nombre:authaspirante.Nombres,idAspirante:authaspirante.IDAspirantes},config.secret,{expiresIn: 86400})
            if(a== b)
            {  console.log("igual",a,b)
                return res.json({auth:true,Token:token,asp:true});
                
            }
            else
                {   console.log("diferente",a,b)
                    return res.json({auth:true,Token:token,asp:false});    
                }
        
        }
    }
    else{
        token= jwt.sign({tipo:authUser.IDUserType.UserType,id:authUser.IDUser,cedula:authUser.Identification,nombre:authUser.Name+" "+authUser.Lastname},config.secret,{expiresIn: 86400})
        return res.json({auth:true,Token:token,asp:false});
    }
    
};
export const logout = async(req:Request, res:Response):Promise<Response> => {
    console.log("echo");
    
    return res.json({auth:false,Token:null,asp:false});
};