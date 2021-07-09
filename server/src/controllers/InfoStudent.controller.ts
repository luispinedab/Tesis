import {json, Request,Response} from 'express';
import {createQueryBuilder, getRepository,getConnection, Any, MoreThan, Equal, Between, LessThan, Brackets}from 'typeorm';
import {InfoStudent}from '../entity/InfoEstudiante';
import {ExperienciasEscolares}from '../entity/ExperienciasEscolares';
import {Hermanos}from '../entity/Hermanos';

export const getInfoestudiantes = async(req:Request,res:Response):Promise<Response>=>{
    //const results = await getRepository(InfoStudent).find({relations:['IDAspirante']});
    const results1 = await getRepository(InfoStudent)
    .createQueryBuilder("info")
    .leftJoinAndSelect("info.IDGrade", "Grades")
    .where("Grades.IDGrade = info.IDGrade") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .innerJoinAndSelect("info.IDAspirante", "Aspirantes")
    .where("Aspirantes.UserState = 1")
    .getMany(); 
    return res.json(results1);
    
};
export const createInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    console.log(req.body);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    req.body.infoEstudiante.FechadeModificacion= dateTime;
    req.body.infoEstudiante.FechadeCreacion=dateTime;
     req.body.infoEstudiante.vivecon=req.body.infoEstudiante.vivecon.join();
     const newUser = getRepository(InfoStudent).create(req.body.infoEstudiante);
     console.log(newUser);
     const results = await getRepository(InfoStudent).save(newUser);
     const user = await getRepository(InfoStudent)
    .createQueryBuilder("InfoStudent")
    .select("InfoStudent.IDInfoEstudiante")
    .orderBy("InfoStudent.IDInfoEstudiante", "DESC")
    .getOne();
    try {
        var experiences = req.body.experienciasEscolares;
        if(experiences.length!=0){
            for (let index = 0; index < experiences.length; index++) {
                experiences[index].IDInfoEstudiante=user;
                const exp = getRepository(ExperienciasEscolares).create(experiences[index]);
                const results = await getRepository(ExperienciasEscolares).save(exp);
                console.log(results);
            }
        }
    } catch (error) {
        console.log("no hay experiencias");
    }
    
     try {
        var brothers = req.body.hermanos;
        if(brothers.length!=0){
           for (let index = 0; index < brothers.length; index++) {
               brothers[index].IDInfoEstudiante=user;
               const bro = getRepository(Hermanos).create(brothers[index]);
               const results = await getRepository(Hermanos).save(bro);
               console.log(results);
           }
        }
     } catch (error) {
         console.log("no hay hermanos");
     }
     
     console.log("ultimo",user);
     console.log("arreglo",req.body);
    return res.json(results);
};
export const getlastinfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
   const user = await getRepository(InfoStudent)
   .createQueryBuilder("InfoStudent")
   .select("InfoStudent.IDInfoEstudiante")
   .orderBy("InfoStudent.IDInfoEstudiante", "DESC")
   .getOne();
    console.log("ultimo",user);
    return res.json(user);
};
export const getInfoestudiantes_grade = async(req:Request,res:Response):Promise<Response>=>{
    var objeto=req.params.id.split('&');
    console.log(objeto)
    var año= objeto[1]+'-01-01';
    const results1 = await getRepository(InfoStudent)
    .createQueryBuilder("info")
    .leftJoinAndSelect("info.IDGrade", "Grades")
    .where("Grades.IDGrade = info.IDGrade") 
    .innerJoinAndSelect("info.IDAspirante", "Aspirantes")
    .where("Aspirantes.UserState = 1")
    .andWhere(`info.GradoaIngresar='${objeto[0]}' AND info.FechadeCreacion >=${año}`)
    .getMany();
    return res.json(results1);
};
export const getInfoestudiantes_grade1 = async(req:Request,res:Response):Promise<Response>=>{
    var objeto=req.params.id.split('&');
    console.log(objeto)
    var año= objeto[1]+'-01-01';
    const results1 = await getRepository(InfoStudent)
    .createQueryBuilder("info")
    .leftJoinAndSelect("info.IDGrade", "Grades")
    .where("Grades.IDGrade = info.IDGrade") 
    .innerJoinAndSelect("info.IDAspirante", "Aspirantes")
    .where("Aspirantes.UserState = 0")
    .andWhere(`info.GradoaIngresar='${objeto[0]}' AND info.FechadeCreacion >=${año}`)
    .getMany();
    return res.json(results1);
};
export const getInfoestudiantes_curso = async(req:Request,res:Response):Promise<Response>=>{
    var objeto=req.params.id.split('&');
    var año= objeto[1]+'-01-01';
    const results1 = await getRepository(InfoStudent)
    .createQueryBuilder("info")
    .leftJoinAndSelect("info.IDGrade", "Grades")
    .where("Grades.IDGrade = info.IDGrade") 
    .innerJoinAndSelect("info.IDAspirante", "Aspirantes")
    .where("Aspirantes.UserState = 1")
    .andWhere(`info.IDGrade=${objeto[0]} AND info.FechadeCreacion >=${año}`)
    .getMany();
    return res.json(results1);
};
export const getInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(InfoStudent).findOne(req.params.id);
    return res.json(results);
};
export const getInfoestudiantebyaspirante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(InfoStudent).findOne({where:{IDAspirante:req.params.id}});
    return res.json(results);
};
export const updateInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    const user = await getRepository(InfoStudent).findOne(req.params.id);
    if (user){
        getRepository(InfoStudent).merge(user,req.body);
       const results =  await getRepository(InfoStudent).save(user);
       return res.json(results);
    }
    return res.status(404).json({msg: "Not user found"});
};
export const updateInfoestudiantes = async(req:Request,res:Response):Promise<Response>=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var objeto =req.body.IDInfoStudent;
    try {
         if(objeto.length!=0)
        {
            for (let index = 0; index <= objeto.length; index++) {
                
                objeto[index].IDGrade=req.body.IDGrade.IDGrade;
                objeto[index].IDInfoEstudiante=objeto[index].IDInfoEstudiante.id;
                const user = await getRepository(InfoStudent).findOne(objeto[index].IDInfoEstudiante);
                if (user){
                    console.log("Guardado",objeto[index]);
                    getRepository(InfoStudent).merge(user,objeto[index]);
                    const results =  await getRepository(InfoStudent).save(user);
                }
                
            }
            
        }
        
    } catch (error) {
        console.log(error);
    }
    
    return res.json({msg: "Si entra"})
};
export const deleteInfoestudiante = async(req:Request,res:Response):Promise<Response>=>{
    const results = await getRepository(InfoStudent).delete(req.params.id);
    return res.json(results);
};
export const updateNota = async(req:Request,res:Response):Promise<Response>=>{
    try {
        var objeto=req.body;
        console.log(objeto);
        if(objeto.length!=0)
        {  
            for (let index = 0; index < objeto.length; index++) {
                console.log("adentro")
                var nota = await getRepository(InfoStudent).findOne(objeto[index].id);
                if(nota){
                    console.log(nota);
                    getRepository(InfoStudent).merge(nota,objeto[index].value);
                    var results =  await getRepository(InfoStudent).save(nota);
                }
            }
            
        }
            
        } catch (error) {
            console.log(error);
        }
    return res.json({});
};