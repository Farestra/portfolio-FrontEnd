import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Achievement } from '../models/achievement';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  url = "https://protected-waters-55845.herokuapp.com/api/"
  constructor(private http:HttpClient) { }

  //replicamos los métodos del controller en el back end
  //obtenemos todas las achievements para una id de persona
  public list(personid:number): Observable<Achievement[]>{
    return this.http.get<Achievement[]>(this.url+`person/${personid}/achievement`);
  }
  //obtenemos una achievement por su id
  public detail(id:number):Observable<Achievement>{
    return this.http.get<Achievement>(this.url+`achievement/${id}`);
  }

  //creamos una nueva achievement para una persona
  public save(personid:number, achievement:Achievement):Observable<any>{
    return this.http.post<any>(this.url+`person/${personid}/achievement`, achievement);
  }

  //actualizamos una achievement por su id
  public update(id:number, achievement:Achievement):Observable<Achievement>{
    return this.http.put<Achievement>(this.url+`achievement/${id}`, achievement);
  }

  //borramos una achievement por su id
  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`achievement/${id}`);
  }
}
