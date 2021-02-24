import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {ExperienciasEscolares}from '../entity/ExperienciasEscolares';
export const getExperienciasEscolares = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ExperienciasEscolares).find();
    return res.json(results);
};
export const createExperienciasEscolar = async(req:Request,res:Response):Promise<Response>=>{
     const newUser = getRepository(ExperienciasEscolares).create(req.body);
     const results = await getRepository(ExperienciasEscolares).save(newUser);
     console.log("Guardado",req.body);
     return res.json(results);
};
export const getExperienciasEscolar = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ExperienciasEscolares).findOne(req.params.id);
    return res.json(results);
};
export const updateExperienciasEscolar = async(req:Request,res:Response):Promise<Response>=>{
    const user = await getRepository(ExperienciasEscolares).findOne(req.params.id);
    if (user){
        getRepository(ExperienciasEscolares).merge(user,req.body);
       const results =  await getRepository(ExperienciasEscolares).save(user);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteExperienciasEscolar = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ExperienciasEscolares).delete(req.params.id);
    return res.json(results);
};