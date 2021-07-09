import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Citas}from '../entity/Citas';
export const getCitas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Citas).find({relations:['IDInfoEstudiante','IDInfoEstudiante.IDAspirante'],});
    return res.json(results);
};
export const createCita = async(req:Request,res:Response):Promise<Response>=>{
    const newUser = getRepository(Citas).create(req.body);
    const results = await getRepository(Citas).save(newUser);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getCita = async(req:Request,res:Response):Promise<Response>=>{
   const results = await getRepository(Citas).findOne(req.params.id);
   return res.json(results);
};
export const updateCita = async(req:Request,res:Response):Promise<Response>=>{
   const user = await getRepository(Citas).findOne(req.params.id);
   if (user){
       getRepository(Citas).merge(user,req.body);
      const results =  await getRepository(Citas).save(user);
      return res.json(results);
   }
   return res.status(404).json({msg: "Not user found"});
};
export const deleteCita = async(req:Request,res:Response):Promise<Response>=>{
   const results = await getRepository(Citas).delete(req.params.id);
   return res.json(results);
};