import { Component, AfterViewInit } from '@angular/core';
import { GeoService } from '../services/geo.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  mapOptions:L.MapOptions = {
    layers:[L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            })],
    zoom:4,
    center:[51.958,9.141]
  }

  map!:L.Map;

  constructor(private geoService:GeoService) {

  }

  ngAfterViewInit(): void {
    this.setMap();
  }

  setMap(){
    let coords = new L.LatLng(this.geoService.lat, this.geoService.lng);

    this.mapOptions.center = coords;

    this.map = new L.Map('map', this.mapOptions);

    let customIcon:L.IconOptions = {
      iconUrl:"../../assets/marker/blue.png",
      iconSize:[40,40]
    }
    let myIcon = L.icon(customIcon);
    let iconOptions = {
      draggable:true,
      icon:myIcon
    }

    let marker = new L.Marker([this.geoService.lat, this.geoService.lng] , iconOptions);

    marker.addTo(this.map);

    customIcon.iconUrl = "../../assets/marker/red.png";
    myIcon = L.icon(customIcon);

    let customIcon_to:L.IconOptions = {
      iconUrl:"../../assets/marker/red.png",
      iconSize:[40,40]
    }
    let myIcon_to = L.icon(customIcon_to);
    let iconOptions_to = {
      draggable:true,
      icon:myIcon_to
    }

    let marker_to = new L.Marker([this.geoService.lat_to, this.geoService.lng_to] , iconOptions_to);

    marker_to.addTo(this.map);

  }

}
