import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {ExperienciasEscolares}from '../entity/ExperienciasEscolares';
export const getExperienciasEscolares = async(req:Request,res:Response):Promise<Response>=>{
    const results1 = await getRepository(ExperienciasEscolares)
    .createQueryBuilder("exp") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .innerJoinAndSelect("exp.IDInfoEstudiante", "infostudent")
    .innerJoinAndSelect("infostudent.IDAspirante", "Aspirantes")
    .where("Aspirantes.UserState = 1")
    .getMany(); 
    return res.json(results1);
};
export const createExperienciasEscolar = async(req:Request,res:Response):Promise<Response>=>{
     const newUser = getRepository(ExperienciasEscolares).create(req.body);
     const results = await getRepository(ExperienciasEscolares).save(newUser);
     console.log("Guardado",req.body);
     return res.json(results);
};
export const getExperienciasEscolar = async(req:Request,res:Response):Promise<Response>=>{
    const exp = await getRepository(ExperienciasEscolares).createQueryBuilder("ExperienciasEscolares").where(`ExperienciasEscolares.IDInfoEstudiante=${req.params.id}`).getMany();
    return res.json(exp);
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