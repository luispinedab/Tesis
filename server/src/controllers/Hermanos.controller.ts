import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Hermanos}from '../entity/Hermanos';
export const getHermanos = async(req:Request,res:Response):Promise<Response>=>{
    const results1 = await getRepository(Hermanos)
    .createQueryBuilder("Her") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .innerJoinAndSelect("Her.IDInfoEstudiante", "infostudent")
    .innerJoinAndSelect("infostudent.IDAspirante", "Aspirantes")
    .where("Aspirantes.UserState = 1")
    .getMany(); 
    return res.json(results1);
};
export const createHermano = async(req:Request,res:Response):Promise<Response>=>{
     const newUser = getRepository(Hermanos).create(req.body);
     const results = await getRepository(Hermanos).save(newUser);
     console.log("Guardado",req.body);
     return res.json(results);
};
export const getHermano = async(req:Request,res:Response):Promise<Response>=>{
    const her = await getRepository(Hermanos).createQueryBuilder("Hermanos").where(`Hermanos.IDInfoEstudiante=${req.params.id}`).getMany();
    return res.json(her);
};
export const updateHermano = async(req:Request,res:Response):Promise<Response>=>{
    const user = await getRepository(Hermanos).findOne(req.params.id);
    if (user){
        getRepository(Hermanos).merge(user,req.body);
       const results =  await getRepository(Hermanos).save(user);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteHermano = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Hermanos).delete(req.params.id);
    return res.json(results);
};