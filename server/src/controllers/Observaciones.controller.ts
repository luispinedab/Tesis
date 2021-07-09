import {Request,Response} from 'express';
import {getRepository, MoreThan}from 'typeorm';
import {Remark}from '../entity/Observaciones';
import {Falta} from '../entity/Falta';
import {TipoFalta} from '../entity/TipoFalta';
export const getObservaciones = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Remark).find({relations:['IDSubject','IDSubject.IDNameSubject','IDInfoEstudiante'],});
    return res.json(results);
};

export const getObservaciones_ver = async(req:Request,res:Response):Promise<Response>=>{
    console.log(req.params.id);
    var objeto=req.params.id.split('&');
    const results = await getRepository(Remark).find({relations:['IDSubject','IDSubject.IDNameSubject','IDInfoEstudiante'],where:{Periodo:objeto[1],FechaModificacion:MoreThan(objeto[0]+'-01-01 00:00:00'),IDInfoEstudiante:objeto[2]}});
    return res.json(results);
};
export const getfaltas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Falta).find({relations:['IDTipoFalta']});
    return res.json(results);
};
export const getfaltas_tipoFaltas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Falta).find({where:{IDTipoFalta:req.params.id}});
    return res.json(results);
};
export const gettipofaltas = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(TipoFalta).find();
    return res.json(results);
};
export const createObservacion = async(req:Request,res:Response):Promise<Response>=>{
    const newObservacion = getRepository(Remark).create(req.body);
    const results = await getRepository(Remark).save(newObservacion);
    console.log("Guardado",req.body);
    return res.json(results);
};
export const getObservacion = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Remark).findOne(req.params.id,{relations:['IDFalta','IDFalta.IDTipoFalta','IDSubject','IDSubject.IDNameSubject','IDInfoEstudiante'],});
    return res.json(results);
};
export const updateObservacion = async(req:Request,res:Response):Promise<Response>=>{
    const Observacion = await getRepository(Remark).findOne(req.params.id);
    if (Observacion){
        getRepository(Remark).merge(Observacion,req.body);
       const results =  await getRepository(Remark).save(Observacion);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const deleteObservacion = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(Remark).delete(req.params.id);
    return res.json(results);
};