import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Artiste } from 'src/app/Class/artiste';
import { Client } from 'src/app/Class/client';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ClientService } from 'src/app/Services/client.service';
import { AuthentificationComponent } from '../authentification/authentification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  client:Client;
  artiste:Artiste;

  constructor(public dialog: MatDialog,private clientService:ClientService,private artisteService:ArtisteService) { }
  ngOnInit(): void {
    if(localStorage.hasOwnProperty('idClient')) {
      this.clientService.getClientById(Number(localStorage.getItem('idClient'))).subscribe(data => this.client=data);
    }
    if(localStorage.hasOwnProperty('idArtiste')) {
      this.artisteService.getArtisteById(Number(localStorage.getItem('idArtiste'))).subscribe(data => this.artiste=data);
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(AuthentificationComponent,{
      width: '400px',
      height:'400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  logout(){
    localStorage.clear();
    this.client=null;
    this.artiste=null;
  }
}
