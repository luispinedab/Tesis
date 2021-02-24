import {Request,Response} from 'express';
import {createQueryBuilder, getRepository,getConnection}from 'typeorm';
import {InfoStudent}from '../entity/InfoEstudiante';
export const getInfoestudiantes = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(InfoStudent).find();
    return res.json(results);
};
export const createInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
     req.body.vivecon=req.body.vivecon.join();
     const newUser = getRepository(InfoStudent).create(req.body);
     const results = await getRepository(InfoStudent).save(newUser);
    const user = await getRepository(InfoStudent)
    .createQueryBuilder("InfoStudent")
    .select("InfoStudent.IDInfoEstudiante")
    .orderBy("InfoStudent.IDInfoEstudiante", "DESC")
    .getOne();
     console.log("ultimo",user);
     console.log("Guardado",req.body);
     return res.json(results);
};
export const getlastinfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
   const user = await getRepository(InfoStudent)
   .createQueryBuilder("InfoStudent")
   .select("InfoStudent.IDInfoEstudiante")
   .orderBy("InfoStudent.IDInfoEstudiante", "DESC")
   .getOne();
    console.log("ultimo",user);
    return res.json(user);
};
export const getInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(InfoStudent).findOne(req.params.id);
    return res.json(results);
};
export const updateInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    const user = await getRepository(InfoStudent).findOne(req.params.id);
    if (user){
        getRepository(InfoStudent).merge(user,req.body);
       const results =  await getRepository(InfoStudent).save(user);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(InfoStudent).delete(req.params.id);
    return res.json(results);
};