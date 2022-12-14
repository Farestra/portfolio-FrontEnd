import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { TokenStorageService } from './auth/token-storage.service';
const API_URL="https://protected-waters-55845.herokuapp.com/api/"
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url = "https://protected-waters-55845.herokuapp.com/api/"
  constructor(private http:HttpClient,
    private token:TokenStorageService) { }

  
  list():Observable<any>{
    return this.http.get<any>(API_URL + "person/1");
  }

  update(id:number, person:Person):Observable<Person>{
    return this.http.put<Person>(this.url+`person/${id}`, person);
  }
}