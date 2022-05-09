import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/Class/client';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  formValue : FormGroup; 
  
  clientObj: Client = new Client(0,"","","","",new Date(),"","","");
  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;

  constructor(private clientService:ClientService, private activatedRouter:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder) { }

    id:number=this.activatedRouter.snapshot.params['id'];
  public currentClient:Client;

  ngOnInit(): void {
    this.clientService.getClientById(this.id).subscribe
    (data => this.currentClient=data as Client);

    this.formValue = this.formBuilder.group({
      nom:[''],
      prenom:[''],
      email:[''],
      password:['', [Validators.required, Validators.minLength(6)]],
      genre:[],
      image:[''],
      etat:[''],
      dateNaissance:['']
  })
}

EditClient(data:any){
  this.formValue.controls['nom'].setValue(data.nom);
  this.formValue.controls['prenom'].setValue(data.prenom);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['password'].setValue(data.password);
  this.formValue.controls['genre'].setValue(data.genre);
  this.formValue.controls['image'].setValue(data.image);
  this.formValue.controls['etat'].setValue(data.etat);
  this.formValue.controls['dateNaissance'].setValue(data.dateNaissance);
  this.clientObj.id = data.id;
  this.UpdateShowBtn();
}

UpdateClient(){
  this.clientObj.nom = this.formValue.value.nom;
  this.clientObj.prenom = this.formValue.value.prenom;
  this.clientObj.email = this.formValue.value.email;
  this.clientObj.password = this.formValue.value.password;
  this.clientObj.genre = this.formValue.value.genre;
  this.clientObj.image = this.formValue.value.image;
  this.clientObj.etat = this.formValue.value.etat;
  this.clientObj.dateNaissance = this.formValue.value.dateNaissance;
  this.clientService.putClient(this.clientObj,this.clientObj.id).subscribe(res => {
    alert("Profil modifié");
    this.SaveShowBtn();
  })
}

UpdateShowBtn()
{
  this.btnUpdateShow = true;
  this.btnSaveShow = false;
}

SaveShowBtn()
{
  this.btnUpdateShow = false;
  this.btnSaveShow = true;
}

get password(){
  return this.formValue.get('password');
}


}
