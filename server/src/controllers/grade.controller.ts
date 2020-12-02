import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Grade}from '../entity/Curso';

export const getGrades = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Grade).find({relations:['IDDirector']});
    return res.json(results);
};
export const createGrade = async(req:Request,res:Response):Promise<Response>=>{
    const newUser = getRepository(Grade).create(req.body);
    const results = await getRepository(Grade).save(newUser);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getGrade = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Grade).findOne(req.params.id);
    return res.json(results);
};
export const updateGrade = async(req:Request,res:Response):Promise<Response>=>{
    const grade = await getRepository(Grade).findOne(req.params.id);
    if (grade){
        getRepository(Grade).merge(grade,req.body);
       const results =  await getRepository(Grade).save(grade);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteGrade = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Grade).delete(req.params.id);
    return res.json(results);
};