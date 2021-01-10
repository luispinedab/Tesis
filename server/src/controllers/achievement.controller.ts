import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Achievement}from '../entity/Logro';
export const getLogros = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Achievement).find({relations:['IDLevelGrade','IDSubject','IDSubject.IDNameSubject'],});
    return res.json(results);
};
export const createLogro = async(req:Request,res:Response):Promise<Response>=>{
    const newLogro = getRepository(Achievement).create(req.body);
    const results = await getRepository(Achievement).save(newLogro);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getLogro = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Achievement).findOne(req.params.id);
    return res.json(results);
};
export const updateLogro = async(req:Request,res:Response):Promise<Response>=>{
    const logro = await getRepository(Achievement).findOne(req.params.id);
    if (logro){
        getRepository(Achievement).merge(logro,req.body);
       const results =  await getRepository(Achievement).save(logro);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteLogro = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Achievement).delete(req.params.id);
    return res.json(results);
};