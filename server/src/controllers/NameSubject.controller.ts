import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {NameSubject}from '../entity/NombreAsignatura';
export const getNombreAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(NameSubject).find({relations:['IDArea'],});
    return res.json(results);
};