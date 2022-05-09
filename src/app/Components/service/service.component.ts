import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/Class/client';
import { Commentaire } from 'src/app/Class/commentaire';
import { Service } from 'src/app/Class/service';
import { ClientService } from 'src/app/Services/client.service';
import { Signalement } from 'src/app/Class/signalement';
import { ServiceService } from 'src/app/Services/service.service';
import { CommanderComponent } from '../commander/commander.component';
import { Commande } from 'src/app/Class/commande';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { Artiste } from 'src/app/Class/artiste';

export interface DialogData {
  service:Service
  client:Client
  artiste:Artiste
} 

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})


export class ServiceComponent implements OnInit {

  constructor(private dmodif:MatDialog,
              public dialog: MatDialog,
              private serviceSer:ServiceService,
              private activatedRouter:ActivatedRoute,
              private fs:FormBuilder,
              private clientservice:ClientService,
              private artisteservice:ArtisteService) { }

  idArt:number=Number(localStorage.getItem('idArtiste'));//id de l'artiste connecté 
  
  idc:number=Number(localStorage.getItem('idClient'));
  commentaires:Commentaire[];
  idcomm: number; //pour la modification du commentaire
  sig=true;
  mod=true;
  type: string;
  FormAjcomm:FormGroup;
  id:number=this.activatedRouter.snapshot.params['id'];
  auth_client:Client;
  currentProduit:Service;
  currentCommande:Commande;
  art:Artiste;
  ngOnInit(): void {
    
    this.serviceSer.getServiceById(this.id).subscribe
    (data => {this.currentProduit=data as Service
      this.artisteservice.getArtisteById(this.currentProduit.idArtiste).subscribe(data => {this.art = data as Artiste})
    });
    this.clientservice.getClientById(this.idc).subscribe(
      data =>{this.auth_client = data as Client;
           
      }
    )    
    this.serviceSer.getCommentairesById(this.id).subscribe(data=> this.commentaires=data);
    this.FormAjcomm=this.fs.group({
      description:""
    })

  }

  
  openDialog() {
    const dialogRef = this.dialog.open(CommanderComponent,{
      width: '540px',
      height:'690px',
      data: {service:this.currentProduit,
             client:this.auth_client ,
             artiste:this.art
      }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onSubmit(){
    let comm=new Commentaire(0,1,this.id,this.FormAjcomm.value["description"]);//Id Client a modifié avec l'authentification && Id Commentaire auto increment dans la bdd
    this.serviceSer.addComm(comm).subscribe(data=>this.commentaires.push(data));
  }
  supprimerComm(idc:number){
    this.serviceSer.deleteComm(idc).subscribe(()=> this.commentaires= this.commentaires.filter(l=>l.id !=idc));
  }
  opendcomm(idc:number){
    this.mod=false;
    this.idcomm=idc;
  }
  opensig(idc:number,type:string){
    this.sig=false;
    this.idcomm=idc;
    this.type=type;
  }
  modifierComm(ch:string){
    this.serviceSer.updateComm(this.idcomm,new Commentaire(this.idcomm,this.idc,this.id,ch)).subscribe(commentaire => {
      let position = this.commentaires.findIndex(c =>c.id == commentaire.id);this.commentaires[position]=commentaire;});
      this.mod=true;
  }
  signaler(ch:string){
    if(this.type=="commentaire")
    {
      this.serviceSer.addSignalement(new Signalement(0,this.idc,null,this.idcomm,ch)).subscribe();
    }
  else this.serviceSer.addSignalement(new Signalement(0,this.idc,this.idcomm,null,ch)).subscribe();
  this.sig=true;
}

//Artiste:
hide=true;
modifier(){
  document.getElementsByClassName("main-section")[0].classList.add("col-6");
  document.getElementsByClassName("main-section")[0].classList.remove("main-section","col-lg-8");

  this.hide=false;
}
}

function ngOnChanges() {
  throw new Error('Function not implemented.');
}
