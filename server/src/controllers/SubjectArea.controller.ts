import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {SubjectArea}from '../entity/SubjectArea';
export const getArea = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(SubjectArea).find();
    return res.json(results);
};