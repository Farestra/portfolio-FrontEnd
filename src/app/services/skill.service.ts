import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  url = "http://localhost:8080/api/"
  constructor(private http:HttpClient) { }

  //replicamos los métodos del controller en el back end

  public list(personid:number): Observable<Skill[]>{
    return this.http.get<Skill[]>(this.url+`person/${personid}/skill`);
  }

  public detail(id:number):Observable<Skill>{
    return this.http.get<Skill>(this.url+`skill/${id}`);
  }

  public save(personid:number, skill:Skill):Observable<any>{
    return this.http.post<any>(this.url+`person/${personid}/skill`, skill);
  }

  public update(id:number, skill:Skill):Observable<Skill>{
    return this.http.put<Skill>(this.url+`skill/${id}`, skill);
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`skill/${id}`);
  }
}