export class Product {
    bus!:boolean;
    ferry!:boolean;
    national!:boolean;
    nationalExpress!:boolean;
    regional!:boolean;
    regionalExp!:boolean;
    suburban!:boolean;
    subway!:boolean;
    taxi!:boolean;
    tram!:boolean;

    constructor(bus:boolean, ferry:boolean, national:boolean,
                nationalExpress:boolean, regional:boolean, regionalExp:boolean,
                suburban:boolean, subway:boolean, taxi:boolean, tram:boolean){
            this.bus = bus;
            this.ferry = ferry;
            this.national = national;
            this.nationalExpress = nationalExpress;
            this.regional = regional;
            this.regionalExp = regionalExp;
            this.suburban = suburban;
            this.subway = subway;
            this.taxi = taxi;
            this.tram = tram;
    }
}
