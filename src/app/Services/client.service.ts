import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Client } from '../Class/client';

const URL1= "http://localhost:3000/clients";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }
  public authentification(login:string,pwd:string):Observable<Client>{
    return this.http.get<Client>(URL1+"?email="+login+"&password="+pwd);
  }
  public inscription(client:Client):Observable<Client>{
    return this.http.post<Client>(URL1,client);
  }
  public getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(`${URL1}/${id}`);
  }

  putClient(data:any, id:number)
  {
    return this.http.put<any>("http://localhost:3000/clients/" + id,data).pipe(map((res:any)=> {
      return res
    }))
  }
}
