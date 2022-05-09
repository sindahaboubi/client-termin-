import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artiste } from 'src/app/Class/artiste';
import { Commande } from 'src/app/Class/commande';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ServiceService } from 'src/app/Services/service.service';
import { DialogData } from '../service/service.component';
@Component({
  selector: 'app-commander',
  templateUrl: './commander.component.html',
  styleUrls: ['./commander.component.css']
})
export class CommanderComponent implements OnInit {
  art:Artiste;
  constructor(public dialogRef: MatDialogRef<CommanderComponent>,
              @Inject(MAT_DIALOG_DATA)public data: DialogData,
              private serviceS:ServiceService,
              private fb:FormBuilder) { }
  commandeForm:FormGroup;
  facture:FormGroup;
  date_jour:Date=new Date();
  ngOnInit(): void {
    this.commandeForm = this.fb.group({
      idClient:[this.data.client.id],
      idService:[this.data.service.id],
      description:[""],
      dateCommande:[this.date_jour]
    });
    this.facture = this.fb.group({
      idCommande:[]
    });
    console.log(this.data.client)
  }
  commander(){
    if(confirm(`Mr ${this.data.client.nom} vous etes sur de valider votre commande   ?`)){
      this.serviceS.addCommande(this.commandeForm.value).subscribe(
        data=>{
            this.facture = this.fb.group({
              idCommande:[data.id]
            });
            this.serviceS.addFacture(this.facture.value).subscribe(
              data =>{}
            )
        }
      )
    }
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
