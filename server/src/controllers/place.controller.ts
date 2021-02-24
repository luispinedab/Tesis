import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Place}from '../entity/Lugar';
export const getPlaces = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Place).find({relations:['IDDepartament'],});
    return res.json(results);
};
export const getPlace = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Place).findOne(req.params.id);
    return res.json(results);
};