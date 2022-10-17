import { Component,  OnInit, Input } from '@angular/core';
import { multi } from '../../data/data';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  @Input() data = multi;

  side = 'front';
  members = 5;
  sort = 1;

  fields ={

    'front':'',
    'left':'1',
    'right':'2',
    'bottom':'',
    'top':'',
    'back':'',
  }

  filtered = [];

  constructor() { }

  ngOnInit(): void { console.log(multi)}

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
