import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Subject}from '../entity/Asignatura';
export const getAsignaturas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Subject).find({relations:['IDTeacher','IDGrade','IDNameSubject','IDNameSubject.IDArea']});
    return res.json(results);
};
export const createAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const newAsignatura = getRepository(Subject).create(req.body);
    const results = await getRepository(Subject).save(newAsignatura);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Subject).findOne(req.params.id);
    return res.json(results);
};
export const updateAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const asignatura = await getRepository(Subject).findOne(req.params.id);
    if (asignatura){
        getRepository(Subject).merge(asignatura,req.body);
       const results =  await getRepository(Subject).save(asignatura);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteAsignatura = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Subject).delete(req.params.id);
    return res.json(results);
};