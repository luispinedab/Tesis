import {json, Request,Response} from 'express';
import {createQueryBuilder, getRepository,getConnection, Any, MoreThan, Equal, Between, LessThan, Brackets}from 'typeorm';
import {Question}from '../entity/Pregutas';
import { Answer } from '../entity/Respuestas';

export const getPreguntas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Question).find();
    return res.json(results);
};
export const getPreguntasbygrade = async(req:Request,res:Response):Promise<Response>=>{

    const results = await getRepository(Question).find({relations:['IDLevelGrade'],where:{IDLevelGrade:req.params.id}});
    return res.json(results);
};
export const getRespuestasbypreguta =async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Answer).find({relations:['IDPregunta'],where:{IDPregunta:req.params.id}});
    return res.json(results);
};
