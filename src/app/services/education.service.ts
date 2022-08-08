import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  url = "https://protected-waters-55845.herokuapp.com/api/"
  constructor(private http:HttpClient) { }

  //replicamos los métodos del controller en el back end
  //obtenemos todas las educacións para una id de persona
  public list(personid:number): Observable<Education[]>{
    return this.http.get<Education[]>(this.url+`person/${personid}/education`);
  }
  //obtenemos una educación por su id
  public detail(id:number):Observable<Education>{
    return this.http.get<Education>(this.url+`education/${id}`);
  }

  //creamos una nueva educación para una persona
  public save(personid:number, education:Education):Observable<any>{
    return this.http.post<any>(this.url+`person/${personid}/education`, education);
  }

  //actualizamos una educación por su id
  public update(id:number, education:Education):Observable<Education>{
    return this.http.put<Education>(this.url+`education/${id}`, education);
  }

  //borramos una educación por su id
  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`education/${id}`);
  }
}
