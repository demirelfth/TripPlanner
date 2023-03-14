export class Location {
    id!:number;
    latitude!:number;
    longitude!:number;

    constructor(id:number, latitude:number, longitude:number){
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
