
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { Map } from 'leaflet';

import * as barcelona from '../../data/barris.json';

import * as greensites from '../../data/social-residences.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  public map!: Map;
  public currentBarrio: string = '';
  public currentBarrioWeb: string = '';
  public currentIncomeAvg: number = 0;
  public currentNombre: number = 0;
  public currentRenta_familiar: number = 0;
  appSeniorResidents: L.Layer[] = [];





  //TEST FILTERS
  //https://xtk93x.github.io/Leaflet.TileLayer.ColorFilter.updateFilter/

  constructor(public cRef: ChangeDetectorRef) {}

  angularIcon = L.icon({
    iconUrl: './assets/home-marker.svg',
    shadowUrl: './assets/marker-shadow.svg',
    //alt: 'Angular',

    iconSize: [50, 50], // size of the icon
    shadowSize: [40, 40], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 78], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  residenceIcon = L.icon({
    iconUrl: './assets/residence-marker.svg',
    shadowUrl: './assets/marker-shadow.svg',
    //alt: 'Angular',

    iconSize: [50, 50], // size of the icon
    shadowSize: [40, 40], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 78], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  highlightFeature = (e: any) => {
    const layer = e.target;
    //console.log(e.target.feature.properties, 'barrios individual');

    layer.setStyle({
      weight: 5,
      color: 'rgb(76,70,33)',
      dashArray: '',
      fillOpacity: 0.7,
      fillColor: 'rgba(102,133,13, 0.5)',
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    this.currentBarrio = e.target.feature.properties.NOM;
    this.currentNombre = e.target.feature.properties.Nombre;
    this.currentIncomeAvg = e.target.feature.properties.incomeAvg;
    this.currentBarrioWeb = e.target.feature.properties.WEB1;
    this.currentRenta_familiar = e.target.feature.properties.renta_familiar;
    console.log('highlight feature', e.target.feature.properties.NOM);
    this.cRef.detectChanges();
  };

  resetHighlight = (e: any) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColor(parseInt(e.target.feature.properties.Nombre)),
    });
    this.currentBarrio = '';
    this.currentNombre = 0;
  };

  resetIncomeHighlight = (e: any) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getIncomeColor(parseInt(e.target.feature.properties.incomeAvg)),
    });
    this.currentBarrio = '';
    this.currentNombre = 0;
  };

  zoomToFeature = (e: any) => {
    console.log(e.target!.getBounds());
    console.log(this.map, "MAPP")
    this.map.fitBounds(e.target!.getBounds());
  };

  onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  };

  onEachIncomeFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetIncomeHighlight,
      click: this.zoomToFeature,
    });
  };

  //ON MAP READY BEGINN


  onMapReady(map: Map ) {
    console.log('ON MAP READY', map);

    const legend = new (L.Control.extend({
      options: { position: 'bottomright' }
    }));

    const incomeLegend = new (L.Control.extend({
      options: { position: 'bottomleft' }
    }));

    incomeLegend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000],
      labels = [];

     const  getIncomeColor = (d: number) => {
        return d > 50000
          ? '#8210fc'
          : d > 45000
          ? '#a341f9' 
          : d > 40000
          ? '#c981fc' 
          : d > 35000
          ? '#cf8dfc' 
          : d > 30000
          ? '#d497fd' 
          : d > 25000
          ? '#daa2fd' 
          : d > 20000
          ? '#dfadfd' 
          : d > 17500
          ? '#e4b7fe' 
          : d > 15000
          ? '#eac2fe'
          : d > 10000
          ? '#efcdfe' 
          : d > 5000
          ? '#f5d7ff' 
          : '#fae2ff' ;
      }

      div.innerHTML += `<h5>Average Income per Barrio </h5>`

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML += `<i style="background: ${getIncomeColor(grades[i])}"></i> ` +  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' €<br>' : '+');
  }

  return div;
    };



    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 100, 250, 500, 750, 1000, 2000, 3000, 4000, 5000, 6000],
      labels = [];

      const getColor = (d: number) => {
        return d > 6000
          ? '#7F0E24'
          : d > 5000
          ? '#CE0E12' 
          : d > 4000
          ? '#D42216' 
          : d > 3000
          ? '#D93719' 
          : d > 2000
          ? '#DB491D' 
          : d > 1000
          ? '#DE5B1F' 
          : d > 750
          ? '#E26C22' 
          : d > 500
          ? '#E27A22' 
          : d > 250
          ? '#E69125'
          : d > 100
          ? '#F1D332' 
          : d > 0
          ? '#F5EC34' 
          : '#F7F2B2' ;
      }

      div.innerHTML += `<h5>Single people Aged 65+ </h5>`

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML += `<i style="background: ${getColor(grades[i])}"></i> ` +  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' ' + i + ' pts' + '<br>' : '+');
  }

  return div;
    };
    legend.addTo(map);

    incomeLegend.addTo(map);

    


  }

  //ON MAP READY

  style = (feature: any) => {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColor(parseInt(feature.properties.Nombre)),
      //this.getColor(parseInt(e.target.feature.Nombre))
    };
  };

  style2 = (feature: any) => {
    return {
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getIncomeColor(feature.properties.incomeAvg),
      //this.getColor(parseInt(e.target.feature.Nombre))
    };
  };

  greenSiteImg = '../../assets/greenSite_default.jpg';

  getGreenSites() {
    let greenSites = Object.entries(greensites);
    console.log(greenSites, 'green Sites');

    greenSites.forEach((object: any) => {
      const finalObj = object[1];
      //console.log(finalObj.addresses, "final Obj")

      var x_coord = finalObj.geo_epgs_4326 ? finalObj.geo_epgs_4326.x : 0;
      var y_coord = finalObj.geo_epgs_4326 ? finalObj.geo_epgs_4326.y : 0;

      if (typeof x_coord === 'number') {
        var content =
          '<div class="time-into-popup"><div class="time"><div class="date">' +
          'date' +
          '</div><div class="day">' +
          finalObj.name +
          '</div></div></div>' +
          '<div class="pict-into-popup"><img class="pict" src="' +
          this.greenSiteImg +
          '"></div>' +
          '<div class="comment-into-popup">' +
          'undefined' +
          '</div>' +
          '<div class="likes-into-popup"><span class="likes-count"><i class="fa fa-heart likes-icon"></i>' +
          "sample text" +
          '</span></div>';
        return this.appSeniorResidents.push(
          L.marker(
            [
              x_coord,
              y_coord,
            ],
            { icon: this.residenceIcon }
          ).bindPopup(content)
        );
      }
      return null;
    });
    this.layersControl.overlays.SeniorResidents = L.layerGroup(this.appSeniorResidents);
  }

  createMarker() {
    return L.marker([41.437140, 2.1697], { icon: this.angularIcon }).bindPopup(
      'Parc Tecnològic, Carrer Marie Curie, 8 14, , 08042 BARCELONA'
    );
  }

  myMainFilter = ['hue:324deg', 'saturate:250%'];
  myFilter = ['bright:99%', 'hue:226deg', 'saturate:150%'];

  baseLayer3 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myMainFilter,
    }
  );



  baseLayer1 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter,
    }
  );

  myFilter4 = ['invert:100%','grayscale:62%','bright:120%','saturate:398%'];
  myFilter5 =   ['invert:100%','grayscale:6%','bright:149%','hue:216deg','saturate:354%'];
  myFilter6 = ['bright:93%','contrast:103%','hue:335deg','saturate:381%'];

  myFilter7 = ['grayscale:11%','bright:93%','contrast:103%','hue:309deg','saturate:381%'];
  //latest
  myFilter8 =  ['grayscale:11%','hue:307deg'];

  myFilter9 =  ['grayscale:11%','hue:332deg'];

  baseLayer4 = (L.tileLayer as any).colorFilter(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter7,
    }
  );

  baseLayer5 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter8,
    }
  );

  tonerLayer = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}',
    {
      maxZoom: 18,
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      filter: this.myMainFilter,
      ext: 'png',
      subdomains: 'abcd',
    }
  );

  options = {
    layers: [this.baseLayer1, this.tonerLayer],
    zoom: 12,
    center: L.latLng(41.437140, 2.1697),
  };

  layers = [
    L.marker([41.437140, 2.1697], { icon: this.angularIcon }).bindPopup(
      'Parc Tecnològic, Carrer Marie Curie, 8 14, , 08042 BARCELONA'
    ),
    this.createMarker(),
  ];

  layersControl = {
    baseLayers: {
      'Open Street Map': this.baseLayer1,
      'Latest Map': this.baseLayer5,
    },
    overlays: {
      labels: this.tonerLayer,
      Barrios: L.geoJSON(barcelona as any, {
        style: this.style,
        onEachFeature: this.onEachFeature,
      }),
      AvgIncome: L.geoJSON(barcelona as any, {
        style: this.style2,
        onEachFeature: this.onEachIncomeFeature,
      }),
      SeniorResidents: L.layerGroup(this.appSeniorResidents),
    },
  };

  getColor(d: number) {
    return d > 6000
      ? '#7F0E24'
      : d > 5000
      ? '#CE0E12' 
      : d > 4000
      ? '#D42216' 
      : d > 3000
      ? '#D93719' 
      : d > 2000
      ? '#DB491D' 
      : d > 1000
      ? '#DE5B1F' 
      : d > 750
      ? '#E26C22' 
      : d > 500
      ? '#E27A22' 
      : d > 250
      ? '#E69125'
      : d > 100
      ? '#F1D332' 
      : d > 0
      ? '#F5EC34' 
      : '#F7F2B2' ;
  }

  getIncomeColor(d: number) {
    return d > 50000
      ? '#460da0'//
      : d > 45000
      ? '#5c1ead' //
      : d > 40000
      ? '#7734ce' // 
      : d > 35000
      ? '#963dea' //
      : d > 30000
      ? '#af67ef' //
      : d > 25000
      ? '#b573ef' //
      : d > 20000
      ? '#dfadfd' //
      : d > 17500
      ? '#e4b7fe' 
      : d > 15000
      ? '#eac2fe'
      : d > 10000
      ? '#efcdfe' 
      : d > 5000
      ? '#f6e6fc' // 
      : '#fceeff' // ;
  }

  ngAfterViewInit(): void {

    setTimeout(()=>{

      this.getGreenSites();
      this.onMapReady(this.map);

    })

   
  }
}
