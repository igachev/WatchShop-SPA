export interface IUser {
    _id: string;
    email: string;
    password: string;
    userBoughtHistory: string[];
    shopCart: string[];
    __v: number;
}