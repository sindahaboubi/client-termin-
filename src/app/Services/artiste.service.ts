import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artiste } from '../Class/artiste';

const URL1 = 'http://localhost:3000/artistes'
@Injectable({
  providedIn: 'root'
})
export class ArtisteService {

  constructor(private http:HttpClient) { }

  getArtisteById(id:number):Observable<Artiste>{
    return this.http.get<Artiste>(`${URL1}/${id}`);
  }
  public authentification(login:string,pwd:string):Observable<Artiste>{
    return this.http.get<Artiste>(URL1+"?email="+login+"&password="+pwd);
  }
  public inscription(artiste:Artiste):Observable<Artiste>{
    return this.http.post<Artiste>(URL1,artiste);
  }

}
