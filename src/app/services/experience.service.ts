import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  url = "http://localhost:8080/api/"
  constructor(private http:HttpClient) { }

  //replicamos los métodos del controller en el back end
  //obtenemos todas las experiencias para una id de persona
  public list(personid:number): Observable<Experience[]>{
    return this.http.get<Experience[]>(this.url+`person/${personid}/experience`);
  }
  //obtenemos una experiencia por su id
  public detail(id:number):Observable<Experience>{
    return this.http.get<Experience>(this.url+`experience/${id}`)
  }

  //creamos una nueva experiencia para una persona
  public save(personid:number, experience:Experience):Observable<any>{
    return this.http.post<any>(this.url+`person/${personid}/experience`, experience);
  }

  //actualizamos una experiencia por su id
  public update(id:number, experience:Experience):Observable<Experience>{
    return this.http.put<Experience>(this.url+`experience/${id}`, experience);
  }

  //borramos una experiencia por su id
  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`experience/${id}`);
  }
}
