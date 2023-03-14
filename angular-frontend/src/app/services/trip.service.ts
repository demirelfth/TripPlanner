import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../class/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private baseLocationURL = "http://localhost:3000/locations";
  private baseTripURL = "http://localhost:3000/trips";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-CustomHttpHeader':'deneme'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getLocationsList(obje:Object){
    return this.httpClient.post(this.baseLocationURL, obje, this.httpOptions);
  }

  getTripList(obje:Object){
    return this.httpClient.post(this.baseTripURL, obje, this.httpOptions);
  }

}
