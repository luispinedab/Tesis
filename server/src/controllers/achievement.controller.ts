import {Request,Response} from 'express';
import {getRepository, MoreThan}from 'typeorm';
import { AssignedAchievement } from '../entity/assignedachievement';
import {Achievement}from '../entity/Logro';
import {ratings} from '../entity/Notas';
export const getLogros = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Achievement).find({relations:['IDLevelGrade','IDSubject','IDSubject.IDNameSubject'],});
    return res.json(results);
};
export const getassignedLogros = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(AssignedAchievement).find({relations:['IDGrade','IDSubject','IDSubject.IDNameSubject','IDAchievement'],});
    return res.json(results);
};
export const getassignedLogros_menu = async(req:Request,res:Response):Promise<Response>=>{
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    const results = await getRepository(AssignedAchievement).find({relations:['IDGrade','IDSubject','IDSubject.IDNameSubject','IDAchievement'],where:{Periodo:objeto[0],IDSubject:objeto[1]}});
    return res.json(results);
};
export const getLogros_Asignar = async(req:Request,res:Response):Promise<Response>=>{
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    console.log(objeto);
    const results = await getRepository(Achievement).find({relations:['IDLevelGrade','IDSubject','IDSubject.IDNameSubject'],where:{IDLevelGrade:objeto[0],IDSubject:objeto[1]}});
    return res.json(results);
};
export const createLogro = async(req:Request,res:Response):Promise<Response>=>{
    const newLogro = getRepository(Achievement).create(req.body);
    const results = await getRepository(Achievement).save(newLogro);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const createassignedLogro = async(req:Request,res:Response):Promise<Response>=>{
    console.log("Guardado",req.body);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var objeto =req.body;
    objeto.FechaModificacion=dateTime;
    var logros = req.body.IDAchievement;
    if(logros.length!=0)
    {
        for (let index = 0; index < logros.length; index++) {
            if(logros[index].status=="Agregar")
            {   console.log(logros[index].logro)
                objeto.IDAchievement=logros[index].logro;
                const exp = getRepository(AssignedAchievement).create(objeto);
                const results = await getRepository(AssignedAchievement).save(exp);
                console.log(results);
            }
            else if(logros[index].status=="eliminar")
            {   console.log("borrar:",logros[index].logro)
                const results = await getRepository(AssignedAchievement).delete(logros[index].logro);
                console.log(results);
            }
        }
    }
    
    return res.json({});
};
export const getLogro = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Achievement).findOne(req.params.id);
    return res.json(results);
};
export const updateLogro = async(req:Request,res:Response):Promise<Response>=>{
    const logro = await getRepository(Achievement).findOne(req.params.id);
    if (logro){
        getRepository(Achievement).merge(logro,req.body);
       const results =  await getRepository(Achievement).save(logro);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteLogro = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Achievement).delete(req.params.id);
    return res.json(results);
};
export const getNotas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(ratings).find({relations:['IDGrade','IDSubject','IDStudent','IDDocente'],});
    return res.json(results);
};
export const getNotasbyMateria = async(req:Request,res:Response):Promise<Response>=>{
    var today = new Date();
    var anio=today.getFullYear().toString();
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    console.log(objeto);
    const results = await getRepository(ratings).find({relations:['IDGrade','IDSubject','IDStudent','IDDocente'],where:{Periodo:objeto[0],IDGrade:objeto[1],IDSubject:objeto[2],FechadeModificacion:MoreThan(anio+'-01-01 00:00:00')}});
    return res.json(results);
};
export const getNotasbyEstudiante = async(req:Request,res:Response):Promise<Response>=>{
    var today = new Date();
    var anio=today.getFullYear().toString();
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    console.log(objeto);
    const results = await getRepository(ratings).find({relations:['IDGrade','IDSubject','IDStudent','IDDocente','IDSubject.IDNameSubject'],where:{Periodo:objeto[0],IDStudent:objeto[2],FechadeModificacion:MoreThan(anio+'-01-01 00:00:00')}});
    return res.json(results);
};
export const createNota = async(req:Request,res:Response):Promise<Response>=>{
    try {
    var objeto=req.body;
    console.log(objeto);
    if(objeto.length!=0)
    {  
        for (let index = 0; index < objeto.length; index++) {
            var exp = getRepository(ratings).create(objeto[index]);
                var results = await getRepository(ratings).save(exp);
                console.log(results);
        }
        
    }
        
    } catch (error) {
        console.log(error);
    }
    return res.json({});
};
export const updateNota = async(req:Request,res:Response):Promise<Response>=>{
    try {
        var objeto=req.body;
        console.log(objeto);
        if(objeto.length!=0)
        {  
            for (let index = 0; index < objeto.length; index++) {
                console.log("adentro")
                var nota = await getRepository(ratings).findOne(objeto[index].id);
                if(nota){
                    console.log(nota);
                    getRepository(ratings).merge(nota,objeto[index].value);
                    var results =  await getRepository(ratings).save(nota);
                }
            }
            
        }
            
        } catch (error) {
            console.log(error);
        }
    return res.json({});
};
