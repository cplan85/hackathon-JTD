import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [AppComponent, MapComponent, BarChartComponent],
  imports: [BrowserModule, LeafletModule,  NgxChartsModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
