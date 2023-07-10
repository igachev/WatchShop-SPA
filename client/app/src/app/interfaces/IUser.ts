export interface IUser {
    _id: string;
    email: string;
    password: string;
    userBoughtHistory: object[];
    shopCart: object[];
    __v: number;
}