import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.css']
})
export class RechercherComponent implements OnInit {
  titre :any;
  services:Service[];
  constructor(private serviceservice:ServiceService) { }

  ngOnInit(): void {
    this.serviceservice.getServices().subscribe(
      data=>{
        this.services = data;
      }
    )
  }

  search(){
    return this.services.filter(serv => {
      return serv.titre?.toLocaleLowerCase().match(this.titre?.toLocaleLowerCase())      
    });
   }
}
