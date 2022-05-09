import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/Class/service';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent implements OnInit {

  constructor() { }

  @Input()service:Service;
  ngOnInit(): void {
  }

}
