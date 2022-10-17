import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LayoutComponent } from './layout/layout.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ResumenComponent } from './resumen/resumen.component';
import { BarChart2Component } from './bar-chart2/bar-chart2.component';


@NgModule({
  declarations: [AppComponent, MapComponent, BarChartComponent, LayoutComponent, PieChartComponent, ResumenComponent, BarChart2Component],
  imports: [BrowserModule, LeafletModule,  NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
