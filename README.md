# JTD - Hackathon

## ![header](challenge-image2.jpg)

[Back-End Repo](https://github.com/nillozama/HackatonPersonas65) 

Our [Jornada de Talent Digital Hackathon](https://nuwe.io/dev/event/hackathon-jornada-talent) submission is an Angular application of an analytics platform that allows Barcelona Municipiality employees to gather data visualizations related to the quantity of senior citizens living alone in different neighborhoods and economic levels per neighborhoods.

The main navigation format is based on an interactive 3D cube, and each face of the cube represents distinct datapoints. Much of the data is generated through json files that are accessed through the backend servers. A Geo JSON file is also infused with the datapoints related to senior citizens resulting in an interactive color-coded map. The starting point for the data which the Data Science team processed can be found [here](https://opendata-ajuntament.barcelona.cat/data/ca/dataset/divter/resource/ed515bb8-502b-4dff-96dc-769f72767919).

<img src="1stPrize.png" alt="1st-Prize" width="40"/>

### Our submission was chosen as the 1st Prize Winner! 

## **Preview**

## ![preview](src/assets/preview.gif)

## :wrench: **Tech used in this project**

In this project we used Angular and Boostrap5 to develop a web app that reads a JSON file with datapoints in which row is listed the neighborhood name with
- neighborhood name
- higher education graduates
- number of unemployed
- cost of rents for family
- number of senior citizens living alone
- index of people aged 65 and older.

The map was developed using [Leaflet](https://leafletjs.com/) and the neighborhoods are delimited by a GeoJSON file. A "get color" function colors each neighborhood based on the determined average income and the number of senior citizens living in that block.

Corresponding bar graphs and pie charts are developed with the help of [Ngx-Charts](https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical). To feed the data to both chart types, the main JSON file had to be modified to become an proper input for each chart type.

The Cube Transitions were developed using CSS transformations and translations.

---

## :memo: **What do we still need to do**

1. Login Administration of different users.

2. Dynamic Filtering of different data points. 

3. Sidebar Statistics representation in dynamic charts.

4. Design and style the app.


---

## :seedling: **Getting Started with this project**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Installation

Clone or fork the Repo, and ensure that you have the [Angular CLI](https://github.com/angular/angular-cli) installed.

In the project directory.

```bash
npm install
```

In the project directory.

```bash
ng serve --open or ng s -o
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)