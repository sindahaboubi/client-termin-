import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../Class/categorie';
import { Commande } from '../Class/commande';
import { Commentaire } from '../Class/commentaire';
import { Facture } from '../Class/facture';
import { Service } from '../Class/service';
import { Signalement } from '../Class/signalement';

const URL = "http://localhost:3000/services";
const URL2 = "http://localhost:3000/categorie";
const URL3 = "http://localhost:3000/commentaire";
const URL4 = "http://localhost:3000/signalement";
const URL5 = "http://localhost:3000/commandes";
const URL6 = "http://localhost:3000/factures";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getServices():Observable<Service[]>{
    return this.http.get<Service[]>(URL);
  }
  
  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${URL}/${id}`);
  } 

  getCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(URL2);
  }
  getCommentairesById(id: number): Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(`${URL3}?idservice=${id}`);
  }
  addComm(c:Commentaire):Observable<Commentaire>{
    return this.http.post<Commentaire>(URL3,c);
  }
  deleteComm(id:number){
    console.log(id);
    return this.http.delete(URL3+"/"+ id);
  }
  updateComm(id:number, c:Commentaire):Observable<Commentaire>
  {
    return this.http.put<Commentaire>(URL3+"/"+id,c);
  }
  addSignalement(s:Signalement):Observable<Signalement> {
    return this.http.post<Signalement>(URL4,s);
  }
    /*getProduct(id:number) {
      return this.http.get(`${URL}/${productId}`)
    }*/

    addCommande(cmd:Commande):Observable<Commande>{
      return this.http.post<Commande>(URL5,cmd);
    }

    getCommandeById(id:number):Observable<Commande>{
      return this.http.get<Commande>(`${URL5}/${id}`);
    }

    addFacture(fact:Facture):Observable<Facture>{
      return this.http.post<Facture>(URL6,fact);
    }
    
}
