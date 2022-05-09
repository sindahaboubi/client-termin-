import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-modifier-service',
  templateUrl: './modifier-service.component.html',
  styleUrls: ['./modifier-service.component.css']
})
export class ModifierServiceComponent implements OnInit {
  @Input() id:number
  s:Service;
  modifForm:FormGroup;
  constructor(private serviceService:ServiceService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.serviceService.getServiceById(this.id).subscribe(data=>{    
      console.log(data.dateCrea);this.s=data});
    this.modifForm = this.fb.group({
    idArtiste:[this.s.idArtiste],
    description:[this.s.description],
    prix:[this.s.prix],
    titre:[this.s.titre],
    dateCrea:[this.s.dateCrea],
    etat:[this.s.etat],
    cat:[this.s.cat],
    image:[this.s.image],
    hauteur:[this.s.hauteur],
    largeur:[this.s.largeur]
    })
  }

}
