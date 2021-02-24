import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {InfoEstudiante} from '../models/InfoEstudiante'
import {ExperienciasEscolares} from '../models/ExperienciasEscolares'
import {Hermanos} from '../models/Hermanos'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InfoestudianteService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getInfoEstudiantes(){
    return this.http.get(`${this.API_URI}/Infoestudiantes`);
  }
  getlastinfoEstudiante(){
    return this.http.get(`${this.API_URI}/LastInfoestudiante`);
  }
  getExperienciasEscolares(){
    return this.http.get(`${this.API_URI}/ExperienciasEscolares`);
  }
  getHermanos(){
    return this.http.get(`${this.API_URI}/Hermanos`);
  }
  saveExperienciasEscolares(experiencias:ExperienciasEscolares){
    return this.http.post(`${this.API_URI}/ExperienciasEscolares`,experiencias);
  }
  saveHermanos(hermanos:Hermanos){
    return this.http.post(`${this.API_URI}/Hermanos`,hermanos);
  }
  getInfoEstudiante(id:string){
    return this.http.get(`${this.API_URI}/Infoestudiantes/${id}`);
  }
  deleteInfoEstudiante(id: string|number){
    return this.http.delete(`${this.API_URI}/Infoestudiantes/${id}`)
  }
  saveInfoEstudiante(infoEstudiante:InfoEstudiante){
    return this.http.post(`${this.API_URI}/Infoestudiantes`,infoEstudiante);
  }
  updateInfoEstudiante(id: string|number,updatedInfoEstudiante: InfoEstudiante): Observable<InfoEstudiante>{
    return this.http.put(`${this.API_URI}/Infoestudiantes/${id}`,updatedInfoEstudiante);
  }
}
