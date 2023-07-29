import { IUser } from "../shared/interfaces/IUser";


export const USERS: IUser[] = [
{
    _id: '1',
    email: 'ivan@abv.bg',
    password: '1234',
    shopCart: [
        {
            0: '64ad26c15a3776a02491bf34',
        },
        {
            1: '64ad26f35a3776a02491bf36'
        }
    ],
    userBoughtHistory: [
        {    
    watchId: '64ad26f35a3776a02491bf36',
    quantity:2,
    totalSum:800,
    name:"ivan",
    phone:"123456",
    address:"nope123",
    _id:"64ad2b5fe0aca02e14c0c092",
    date:"2023-07-11T10:13:51.057+00:00"
        },
        {
    watchId: '64ad26c15a3776a02491bf34',
    quantity: 4,
    totalSum: 1400,
    name:"tom",
    phone:"33333",
    address:'nope',
     _id:"64ad2b81e0aca02e14c0c09c",
    date:"2023-07-11T10:14:25.425+00:00"
        }
    ],
    __v: 0
},

{
    _id: '2',
    email: 'ivo@abv.bg',
    password: '1234',
    shopCart: [],
    userBoughtHistory: [],
    __v: 0
}

]