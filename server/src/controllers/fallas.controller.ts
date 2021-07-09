import {Request,Response} from 'express';
import {getRepository, MoreThan}from 'typeorm';
import {absences} from '../entity/Fallas';

export const getFallas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(absences).find({relations:['IDGrade','IDStudent','IDDocente'],});
    return res.json(results);
};
export const createFalla = async(req:Request,res:Response):Promise<Response>=>{
    const newFalla = getRepository(absences).create(req.body);
    const results = await getRepository(absences).save(newFalla);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getFallasbyGrade = async(req:Request,res:Response):Promise<Response>=>{
    var today = new Date();
    var anio=today.getFullYear().toString();
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    console.log(objeto);
    const results = await getRepository(absences).find({relations:['IDGrade','IDStudent','IDDocente'],where:{Periodo:objeto[0],IDGrade:objeto[1],FechadeModificacion:MoreThan(anio+'-01-01 00:00:00')}});
    return res.json(results);
};
export const getFallasbyStudent = async(req:Request,res:Response):Promise<Response>=>{
    var today = new Date();
    var anio=today.getFullYear().toString();
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    console.log(objeto);
    const results = await getRepository(absences).find({relations:['IDGrade','IDStudent','IDDocente'],where:{Periodo:objeto[0],IDStudent:objeto[1],FechadeModificacion:MoreThan(anio+'-01-01 00:00:00')}});
    return res.json(results);
};