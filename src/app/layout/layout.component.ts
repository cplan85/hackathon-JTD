import { Component,  OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  @Input() data;

  side = 'front';
  members = 5;
  sort = 1;

  fields ={

    'front':'',
    'left':'',
    'right':'',
    'bottom':'',
    'top':'',
    'back':'',
  }

  filtered = [];

  constructor() { }

  ngOnInit(): void {}

  show(clsName:string){ 
    
    this.side = clsName; 
  
  }

  setSort(i:number){

    this.sort = i;
    this.filter();

  }

  setRange(i:any){ 

    this.members = i.target.value

   }

  filter(){

    const data =  [...(this.data || [])], field = this.fields[this.side];

    this.filtered = data.sort( (a:any,b:any)=>{

      return (a[field] - b[field])

    }) 
  }

}
