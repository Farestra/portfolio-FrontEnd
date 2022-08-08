import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = "https://protected-waters-55845.herokuapp.com/api/"
  constructor(private http:HttpClient) { }

  //replicamos los métodos del controller en el back end

  public list(personid:number): Observable<Company[]>{
    return this.http.get<Company[]>(this.url+`person/${personid}/company`);
  }

  public detail(id:number):Observable<Company>{
    return this.http.get<Company>(this.url+`company/${id}`);
  }

  public save(personid:number, company:Company):Observable<any>{
    return this.http.post<any>(this.url+`person/${personid}/company`, company);
  }

  public update(id:number, company:Company):Observable<Company>{
    return this.http.put<Company>(this.url+`company/${id}`, company);
  }

  public delete(id:number):Observable<any>{
    return this.http.delete<any>(this.url+`company/${id}`);
  }
}
