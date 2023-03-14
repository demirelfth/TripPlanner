import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  public lat:number = 51.141;
  public lng:number = 9.141;

  public lat_to:number = 51.141;
  public lng_to:number = 9.141;

  constructor() { }
}

