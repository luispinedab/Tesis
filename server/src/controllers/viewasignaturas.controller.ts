import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {ViewAsignatura}from '../entity/VistaAsignatura';
export const getAsignaturas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ViewAsignatura).find();
    return res.json(results);
};
export const createAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const newAsignatura = getRepository(ViewAsignatura).create(req.body);
    const results = await getRepository(ViewAsignatura).save(newAsignatura);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ViewAsignatura).findOne(req.params.id);
    return res.json(results);
};
export const updateAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const asignatura = await getRepository(ViewAsignatura).findOne(req.params.id);
    if (asignatura){
        getRepository(ViewAsignatura).merge(asignatura,req.body);
       const results =  await getRepository(ViewAsignatura).save(asignatura);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ViewAsignatura).delete(req.params.id);
    return res.json(results);
};