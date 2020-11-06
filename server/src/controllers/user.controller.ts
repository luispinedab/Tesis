import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {User}from '../entity/Usuario';
export const getUsers = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(User).find({relations:['IDUserType']});
    return res.json(results);
};
export const createUser = async(req:Request,res:Response):Promise<Response>=>{
     const newUser = getRepository(User).create(req.body);
     const results = await getRepository(User).save(newUser);
     console.log("Guardado",req.body);
     return res.json(results);
};
export const getUser = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(User).findOne(req.params.id);
    return res.json(results);
};
export const updateUser = async(req:Request,res:Response):Promise<Response>=>{
    const user = await getRepository(User).findOne(req.params.id);
    if (user){
        getRepository(User).merge(user,req.body);
       const results =  await getRepository(User).save(user);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteUser = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(User).delete(req.params.id);
    return res.json(results);
};