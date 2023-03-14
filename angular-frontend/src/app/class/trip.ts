import { Leg } from '../class/leg';
import { Line } from '../class/line';
import { Price } from '../class/price';
import { Stop } from '../class/stop';
import { Location } from '../class/location';
import { Product } from '../class/product';

export class Trip {
    legs!:Leg[];
    price!:Price;

    constructor(legs:Leg[],
                price:Price){
                    this.legs = [];

                    for(let i = 0; i < legs.length; i++){
                        this.addLeg(legs[i]);
                    }

                    this.price = new Price(price.amount,
                                            price.currency);
                }
    
    addLeg(leg:Leg){
        let location_destination = new Location(leg.destination.location.id,
                                                leg.destination.location.latitude,
                                                leg.destination.location.longitude);
        let location_product = new Product(leg.destination.products.bus,
                                            leg.destination.products.ferry,
                                            leg.destination.products.national,
                                            leg.destination.products.nationalExpress,
                                            leg.destination.products.regional,
                                            leg.destination.products.regionalExp,
                                            leg.destination.products.suburban,
                                            leg.destination.products.subway,
                                            leg.destination.products.taxi,
                                            leg.destination.products.tram);
        let destination = new Stop(leg.destination.id,
                                    location_destination,
                                    leg.destination.name,
                                    location_product);

        let line = new Line(leg.line.id,
                            leg.line.mode,
                            leg.line.name,
                            leg.line.product,
                            leg.line.productName,
                            leg.line.publicVal);

        let location_origin = new Location(leg.origin.location.id,
                                            leg.origin.location.latitude,
                                            leg.origin.location.longitude);

        let product_origin = new Product(leg.origin.products.bus,
                                            leg.origin.products.ferry,
                                            leg.origin.products.national,
                                            leg.origin.products.nationalExpress,
                                            leg.origin.products.regional,
                                            leg.origin.products.regionalExp,
                                            leg.origin.products.suburban,
                                            leg.origin.products.subway,
                                            leg.origin.products.taxi,
                                            leg.origin.products.tram);

        let origin = new Stop(leg.origin.id,
                                location_origin,
                                leg.origin.name,
                                product_origin);
        
        let legVal = new Leg(leg.arrival,
                            leg.arrivalDelay,
                            leg.arrivalPlatform,
                            leg.departure,
                            leg.departureDelay,
                            leg.departurePlatform,
                            destination,
                            leg.direction,
                            line,
                            leg.loadFactor,
                            origin,
                            leg.plannedArrival,
                            leg.plannedArrivalPlatform,
                            leg.plannedDeparture,
                            leg.plannedDeparturePlatform);

        this.legs.push(legVal);
    }
}
