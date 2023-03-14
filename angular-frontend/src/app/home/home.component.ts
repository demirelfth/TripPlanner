import { Component, OnInit, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { TripService } from '../services/trip.service';
import { GeoService } from '../services/geo.service';

import { Trip } from '../class/trip';
import { Stop } from '../class/stop';
import { Location } from '../class/location';
import { Product } from '../class/product';
import { Line } from '../class/line';
import { Leg } from '../class/leg';
import { Price } from '../class/price';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jsonContent:any;
  jsonResponse:any;

  jsonGetLocationsRequestBody:any;
  jsonGetTripsRequestBody:any;
  
  trips!:Trip[];
  suggestions!:Stop[];
  legs!:Leg[];

  stop!:Stop;
  location!:Location;
  product!:Product;

  trip!:Trip;
  line!:Line;
  leg!:Leg;
  price!:Price;

  from!:Stop;
  to!:Stop;
  desired_date!:String;
  desired_time!:String;

  selectedTrip!:number;

  constructor(private tripService:TripService,
              private geoService:GeoService,
              @Inject(DOCUMENT) private document: HTMLDocument) {
    this.selectedTrip = -1;

  }

  ngOnInit(): void {

  }

  getLocations(){
    return new Promise((resolve,reject) => {
      this.tripService.getLocationsList(JSON.parse(this.jsonGetLocationsRequestBody))
        .subscribe((res)=>{
            this.jsonContent = res;
            resolve(res);
          },(err)=>{
            console.log(err);
          });
    });
  }

  getTrips(){
    return new Promise((resolve,reject) => {
      this.tripService.getTripList(JSON.parse(this.jsonGetTripsRequestBody))
        .subscribe((res)=>{
            this.jsonContent = res;
            resolve(res);
          },(err)=>{
            console.log(err);
          });
    });
  }

  async onSearchChange(eventValue: Event, inputType:number){
    let searchValue = (eventValue.target as HTMLInputElement).value;

    if(searchValue === "" || searchValue === undefined || searchValue === null){
      this.suggestions = [];
      return;
    }

    this.jsonGetLocationsRequestBody = '{"search":"' + searchValue + '"}';
    this.jsonResponse = await this.getLocations();
    this.suggestions = [];

    for(let i = 0; i < this.jsonResponse.length; i++){
      this.location = new Location(this.jsonResponse[i].location.id,
                                    this.jsonResponse[i].location.latitude,
                                    this.jsonResponse[i].location.longitude);

      this.product = new Product(this.jsonResponse[i].products.bus,
                                  this.jsonResponse[i].products.ferry,
                                  this.jsonResponse[i].products.national,
                                  this.jsonResponse[i].products.nationalExpress,
                                  this.jsonResponse[i].products.regional,
                                  this.jsonResponse[i].products.regionalExp,
                                  this.jsonResponse[i].products.suburban,
                                  this.jsonResponse[i].products.subway,
                                  this.jsonResponse[i].products.taxi,
                                  this.jsonResponse[i].products.tram);

      this.stop = new Stop(this.jsonResponse[i].id,
                            this.location,
                            this.jsonResponse[i].name,
                            this.product);

      this.suggestions.push(this.stop);
    }
    this.checkSuggestion(searchValue, inputType);
  }

  checkSuggestion(searchValue:any, inputType:number){
    if(this.suggestions != null){
      for(let i = 0; i < this.suggestions.length; i++){
        if(searchValue == this.suggestions[i].name && inputType == 1){
          this.setFrom(this.suggestions[i]);
        }else if(searchValue == this.suggestions[i].name && inputType == 2){
          this.setTo(this.suggestions[i]);
        }
      }
    }
  }

  setFrom(value:Stop){
    let location = new Location(value.location.id,
                                value.location.latitude,
                                value.location.longitude);
    let product = new Product(value.products.bus,
                              value.products.ferry,
                              value.products.national,
                              value.products.nationalExpress,
                              value.products.regional,
                              value.products.regionalExp,
                              value.products.suburban,
                              value.products.subway,
                              value.products.taxi,
                              value.products.tram);
    this.from = new Stop(value.id, location, value.name, product);
    this.suggestions = [];
  }

  setTo(value:Stop){
    let location = new Location(value.location.id,
                                value.location.latitude,
                                value.location.longitude);
    let product = new Product(value.products.bus,
                              value.products.ferry,
                              value.products.national,
                              value.products.nationalExpress,
                              value.products.regional,
                              value.products.regionalExp,
                              value.products.suburban,
                              value.products.subway,
                              value.products.taxi,
                              value.products.tram);
    this.to = new Stop(value.id, location, value.name, product);
    this.suggestions = [];
  }

  setDesiredDate(eventValue: Event){
    this.desired_date = (eventValue.target as HTMLInputElement).value;
  }

  setDesiredTime(eventValue: Event){
    this.desired_time = (eventValue.target as HTMLInputElement).value;
  }

  async setTrips(){
    // Check values
    if(this.from == undefined ||
        this.to == undefined ||
        this.desired_date == undefined ||
        this.desired_time == undefined){
          alert("Fill all inputs.");
          return;
        }

    // Convert time to +01:00 for API
    let time = this.desired_time.split(":");
    let hour = Number(time[0]) - 1;
    time[0] = String(hour);
    this.desired_time = time[0] + ":" + time[1];

    this.jsonGetTripsRequestBody = '{"from":"'          + String(this.from.id)       + '",' +
                                      '"to":"'          + String(this.to.id)         + '",' +
                                      '"date":"'        + this.desired_date          + '",' +
                                      '"time":"'        + this.desired_time          + '"' +
                                    '}';

    this.jsonResponse = await this.getTrips();

    this.trips = [];

    for(let i = 0; i < this.jsonResponse.journeys.length; i++){
      this.legs = [];

      for(let j = 0; j < this.jsonResponse.journeys[i].legs.length; j++){
        let location_destination = new Location(this.jsonResponse.journeys[i].legs[j].destination.location.id,
                                                this.jsonResponse.journeys[i].legs[j].destination.location.latitude,
                                                this.jsonResponse.journeys[i].legs[j].destination.location.longitude);
        
        let product_destination = new Product(this.jsonResponse.journeys[i].legs[j].destination.products.bus,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.ferry,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.national,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.nationalExpress,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.regional,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.regionalExp,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.suburban,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.subway,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.taxi,
                                                this.jsonResponse.journeys[i].legs[j].destination.products.tram);

        let destination = new Stop(this.jsonResponse.journeys[i].legs[j].destination.id,
                                    location_destination,
                                    this.jsonResponse.journeys[i].legs[j].destination.name,
                                    product_destination);

        let line!:Line;
        if(this.jsonResponse.journeys[i].legs[j].line != undefined){
          line = new Line(this.jsonResponse.journeys[i].legs[j].line.id,
                          this.jsonResponse.journeys[i].legs[j].line.mode,
                          this.jsonResponse.journeys[i].legs[j].line.name,
                          this.jsonResponse.journeys[i].legs[j].line.product,
                          this.jsonResponse.journeys[i].legs[j].line.productName,
                          this.jsonResponse.journeys[i].legs[j].line.public);
        }else{
          line = new Line("-1",
                          "Walking",
                          "-1",
                          "-1",
                          "-1",
                          true);
        }

        let location_origin = new Location(this.jsonResponse.journeys[i].legs[j].origin.location.id,
                                            this.jsonResponse.journeys[i].legs[j].origin.location.latitude,
                                            this.jsonResponse.journeys[i].legs[j].origin.location.longitude);

        let product_origin = new Product(this.jsonResponse.journeys[i].legs[j].origin.products.bus,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.ferry,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.national,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.nationalExpress,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.regional,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.regionalExp,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.suburban,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.subway,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.taxi,
                                          this.jsonResponse.journeys[i].legs[j].origin.products.tram);

        let origin = new Stop(this.jsonResponse.journeys[i].legs[j].origin.id,
                                location_origin,
                                this.jsonResponse.journeys[i].legs[j].origin.name,
                                product_origin);
        let leg = new Leg(this.jsonResponse.journeys[i].legs[j].arrival,
                            this.jsonResponse.journeys[i].legs[j].arrivalDelay,
                            this.jsonResponse.journeys[i].legs[j].arrivalPlatform,
                            this.jsonResponse.journeys[i].legs[j].departure,
                            this.jsonResponse.journeys[i].legs[j].departureDelay,
                            this.jsonResponse.journeys[i].legs[j].departurePlatform,
                            destination,
                            this.jsonResponse.journeys[i].legs[j].direction,
                            line,
                            this.jsonResponse.journeys[i].legs[j].loadFactor,
                            origin,
                            this.jsonResponse.journeys[i].legs[j].plannedArrival,
                            this.jsonResponse.journeys[i].legs[j].plannedArrivalPlatform,
                            this.jsonResponse.journeys[i].legs[j].plannedDeparture,
                            this.jsonResponse.journeys[i].legs[j].plannedDeparturePlatform);

        this.legs.push(leg);
      }

      this.price = new Price(this.jsonResponse.journeys[i].price.amount,
                              this.jsonResponse.journeys[i].price.currency);
      
      this.trip = new Trip(this.legs,this.price);
      this.trips.push(this.trip);
    }

  }

  setTripDetails(indexOfTrip:number){
    this.selectedTrip = indexOfTrip;
    this.setMap();
  }

  setMap(){
    this.geoService.lat = this.trips[this.selectedTrip].legs[0].origin.location.latitude;
    this.geoService.lng = this.trips[this.selectedTrip].legs[0].origin.location.longitude;

    let indexOfLastLeg = this.trips[this.selectedTrip].legs.length - 1;

    this.geoService.lat_to = this.trips[this.selectedTrip].legs[indexOfLastLeg].destination.location.latitude;
    this.geoService.lng_to = this.trips[this.selectedTrip].legs[indexOfLastLeg].destination.location.longitude;
  }

}
