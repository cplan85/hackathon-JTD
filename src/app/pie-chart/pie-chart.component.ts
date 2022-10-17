import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../../data/pie-data';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  single: any[];
  view: any = [600, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme:any = {
    domain: ['#efcdfe', '#eac2fe', '#e4b7fe', '#dfadfd', '#b573ef', '#af67ef', '#963dea', '#C7734ce', '#5c1ead', '#460da0',]

  };
  //['#efcdfe', '#eac2fe', '#e4b7fe', '#dfadfd', '#b573ef', '#af67ef', '#963dea', '#C7734ce', '#5c1ead', '#460da0',]

  constructor() {
    Object.assign(this, { single });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
