export interface IPurchaseHistory {
        watchId:{
                _id:string,
                brand:string;
                model:string
        };
        quantity:number;
        totalSum:number;
        name:string;
        phone:string;
        address:string;
        _id:string;
        date:string;
}