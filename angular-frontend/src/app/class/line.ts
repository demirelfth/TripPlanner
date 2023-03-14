export class Line {
    id!:String;
    mode!:String;
    name!:String;
    product!:String;
    productName!:String;
    publicVal!:boolean;

    constructor(id:String,
                mode:String,
                name:String,
                product:String,
                productName:String,
                publicVal:boolean){
        this.id = id;
        this.mode = mode;
        this.name = name;
        this.product = product;
        this.productName = productName;
        this.publicVal = publicVal;
    }
}
