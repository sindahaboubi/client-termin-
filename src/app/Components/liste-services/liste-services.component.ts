import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/Class/categorie';
@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.component.html',
  styleUrls: ['./liste-services.component.css']
})
export class ListeServicesComponent implements OnInit {
  tabService:Service[];
  tabServiceFiltre:Service[];
  tab:Service[];
  FormTri:FormGroup;
  categories:Categorie[];

  constructor(private serviceSer:ServiceService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.getItem('idArtiste')!=null){
      this.afficherServices(Number(localStorage.getItem('idArtiste')));
    }
    else
    this.afficherServices();
    this.serviceSer.getCategories().subscribe(data => this.categories= data)
    this.FormTri=this.formBuilder.group({
      categorie:[],
      prixMax:[0],
      prixMin:[0],
      choix:[]
    });
    this.FormTri.reset();

  }

  onSubmit()
  {
    if(this.FormTri.value['categorie']!=null){
      var cat=this.FormTri.value['categorie'];
      this.tabServiceFiltre=this.tabService.filter(service =>service.cat==this.FormTri.value['categorie']);
    }
    if(this.FormTri.value['prixMax']!=null){
      this.tabServiceFiltre=this.tabService.filter(service =>service.prix<=this.FormTri.value['prixMax']);
    }
    if(this.FormTri.value['prixMin']!=null){
      this.tabServiceFiltre=this.tabService.filter(service =>service.prix>=this.FormTri.value['prixMin']);
    }
    
    if(this.FormTri.value['choix']==1){
      this.tabServiceFiltre=this.tabService;
    }
    console.log(this.tabServiceFiltre);

    this.FormTri.reset();
    this.FormTri.value['categorie']=cat;
  }
  afficherServices(id:number=null){
     if(id!==null){
      this.serviceSer.getServices().subscribe( data => {
        data.filter(service => service.idArtiste==id);
        this.tabService = data})
     }else
     this.serviceSer.getServices().subscribe( data => {this.tabService = data;this.tabServiceFiltre = data})
      }
}
