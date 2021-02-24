import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {Departament}from '../entity/Departamento';
export const getDepartament = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Departament).find();
    return res.json(results);
};