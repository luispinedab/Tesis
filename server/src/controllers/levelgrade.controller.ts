import {Request,Response} from 'express';
import {getRepository}from 'typeorm';
import {LevelGrade}from '../entity/NivelCurso';
export const getNivelCurso = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(LevelGrade).find();
    return res.json(results);
};
