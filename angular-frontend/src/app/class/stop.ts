import { Location } from '../class/location';
import { Product } from '../class/product';

export class Stop {
    id!:number;
    location!:Location;
    name!:String;
    products!:Product;

    constructor(id:number,
                location:Location,
                name:String,
                product:Product){
        this.id = id;
        this.location = new Location(location.id, location.latitude, location.longitude);
        this.name = name;
        this.products = new Product(product.bus, product.ferry, product.national, product.nationalExpress,
                                    product.regional, product.regionalExp, product.suburban, product.subway,
                                    product.taxi, product.tram);
    }
}
