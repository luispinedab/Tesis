import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Achievement} from '../models/Achievement';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getNivelCursos(){
    return this.http.get(`${this.API_URI}/NivelCursos`);
  }
  getAsignaturas(){
    return this.http.get(`${this.API_URI}/asignaturas`);
  }
  getLogros(){
    return this.http.get(`${this.API_URI}/logros`);
  }
  getLogro(id:string){
    return this.http.get(`${this.API_URI}/logros/${id}`);
  }
  deleteLogros(id: string|number){
    return this.http.delete(`${this.API_URI}/logros/${id}`)
  }
  saveLogros(usuario:Achievement){
    return this.http.post(`${this.API_URI}/logros`,usuario);
  }
  updateLogros(id: string|number,updatedLogro: Achievement): Observable<Achievement>{
    return this.http.put(`${this.API_URI}/logros/${id}`,updatedLogro);
  }
}
