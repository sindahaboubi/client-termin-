import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  formAuthentication:FormGroup;
  hide = true;

  constructor(private artisteService:ArtisteService,private clientService:ClientService,private formBuilder:FormBuilder,public dialogRef: MatDialogRef<AuthentificationComponent>) { }
    disableClose:true;
  ngOnInit(): void {
    this.formAuthentication=this.formBuilder.group({
      login:[],
      pwd:[]
    })
  }
  msg="";
  onSubmit(){
    this.clientService.authentification(this.formAuthentication.get('login').value,this.formAuthentication.get('pwd').value).subscribe(data=>{
      if(data[0]!=null){
        localStorage.setItem('idClient',data[0].id);
        this.onNoClick();
      }else
      this.msg="ce compte n'existe pas !";
    });

    this.artisteService.authentification(this.formAuthentication.get('login').value,this.formAuthentication.get('pwd').value).subscribe(data=>{
      if(data[0]!=null){
        localStorage.setItem('idArtiste',data[0].id);
        this.onNoClick();
      }else
      this.msg="ce compte n'existe pas !";
    });
  }
  get login(){
    return this.formAuthentication.get('login');
  }
  get pwd(){
    return this.formAuthentication.get('pwd');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
