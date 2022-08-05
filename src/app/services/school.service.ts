import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  url = "http://localhost:8080/api/"
  constructor(private http:HttpClient) { }

  //replicamos los métodos del controller en el back end

  public list(personid:number): Observable<School[]>{
    return this.http.get<School[]>(this.url+`person/${personid}/school`);
  }

  public detail(id:number):Observable<School>{
    return this.http.get<School>(this.url+`school/${id}`);
  }

  public save(personid:number, school:School):Observable<any>{
    return this.http.post<any>(this.url+`person/${personid}/school`, school);
  }

  public update(id:number, school:School):Observable<School>{
    return this.http.put<School>(this.url+`school/${id}`, school);
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`school/${id}`);
  }
}
