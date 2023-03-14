import { Stop } from '../class/stop';
import { Location } from '../class/location';
import { Product } from '../class/product';
import { Line } from '../class/line';

export class Leg {
    arrival!:String;
    arrivalDelay!:String;
    arrivalPlatform!:String;
    departure!:String;
    departureDelay!:String;
    departurePlatform!:String;
    destination!:Stop;
    direction!:String;
    line!:Line;
    loadFactor!:String;
    origin!:Stop;
    plannedArrival!:String;
    plannedArrivalPlatform!:String;
    plannedDeparture!:String;
    plannedDeparturePlatform!:String;

    constructor(arrival:String,
                arrivalDelay:String,
                arrivalPlatform:String,
                departure:String,
                departureDelay:String,
                departurePlatform:String,
                destination:Stop,
                direction:String,
                line:Line,
                loadFactor:String,
                origin:Stop,
                plannedArrival:String,
                plannedArrivalPlatform:String,
                plannedDeparture:String,
                plannedDeparturePlatform:String){
        this.arrival = arrival;
        this.arrivalDelay = arrivalDelay;
        this.arrivalPlatform = arrivalPlatform;
        this.departure = departure;
        this.departureDelay = departureDelay;
        this.departurePlatform = departurePlatform;
        let location_destination = new Location(destination.location.id,
                                                destination.location.latitude,
                                                destination.location.longitude);
        let product_destination = new Product(destination.products.bus,
                                                destination.products.ferry,
                                                destination.products.national,
                                                destination.products.nationalExpress,
                                                destination.products.regional,
                                                destination.products.regionalExp,
                                                destination.products.suburban,
                                                destination.products.subway,
                                                destination.products.taxi,
                                                destination.products.tram);
        this.destination = new Stop(destination.id,
                                    location_destination,
                                    destination.name,
                                    product_destination);
        this.direction = direction;
        this.line = new Line(line.id,
                                line.mode,
                                line.name,
                                line.product,
                                line.productName,
                                line.publicVal);
        this.loadFactor = loadFactor;
        let location_origin = new Location(origin.location.id,
                                            origin.location.latitude,
                                            origin.location.longitude);
        let product_origin = new Product(origin.products.bus,
                                            origin.products.ferry,
                                            origin.products.national,
                                            origin.products.nationalExpress,
                                            origin.products.regional,
                                            origin.products.regionalExp,
                                            origin.products.suburban,
                                            origin.products.subway,
                                            origin.products.taxi,
                                            origin.products.tram);
        this.origin = new Stop(origin.id,
                                location_origin,
                                origin.name,
                                product_origin);
        this.plannedArrival = plannedArrival;
        this.plannedArrivalPlatform = plannedArrivalPlatform;
        this.plannedDeparture = plannedDeparture;
        this.plannedDeparturePlatform = plannedDeparturePlatform;
    }
}
