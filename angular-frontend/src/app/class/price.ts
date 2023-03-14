export class Price {
    amount!:number;
    currency!:String;

    constructor(amount:number, currency:String){
        this.amount = amount;
        this.currency = currency;
    }
}
