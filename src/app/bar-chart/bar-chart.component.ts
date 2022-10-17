import { Component, OnInit } from '@angular/core';
import { multi } from '../../data/data';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{
  multi!: any[];
  view: any = [1000, 2000];

  // Observable for update 
update$: Subject<any> = new Subject();

// Update function
updateChart(){
    this.update$.next(true);
}



  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: any = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Neighborhood';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Highest Income';

  colorScheme:any = {
    domain: ['#dfadfd', '#f1d332', '#ce0e12']
  };
  schemeType: any = 'linear';

  constructor() {
    Object.assign(this, { multi });
  }

  sortData() {
    console.log('clicked')
    this.multi= multi!.sort((a,b) => b.series[1].value -  a.series[1].value);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {
    
  console.log(this.multi, "hello world")
  //console.log(this.sorted)
  }
  }


