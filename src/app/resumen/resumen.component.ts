import { Component, OnChanges, Input } from '@angular/core';
import { multi } from '../../data/data';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnChanges {

  @Input() range:number;

  data:any = [];

  constructor() { }

  ngOnChanges(): void {

    this.data = multi.map(e=>({

      "name": e.name,
      "value": e.series[0].value     

    })).slice(0, this.range).sort((a,b)=>b.value-a.value);


  }

}
