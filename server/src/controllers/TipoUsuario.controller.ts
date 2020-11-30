import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {UserType}from '../entity/TipoUsuario';
export const getTipoUsuario = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(UserType).find();
    return res.json(results);
};
