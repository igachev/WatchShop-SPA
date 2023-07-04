export interface IWatch {
    _id?: string;
    brand: string;
    model: string;
    image: string;
    battery: string;
    mechanism: 'mechanical' | 'automatic' | 'quartz';
    price: number;
    quantity: number;
}