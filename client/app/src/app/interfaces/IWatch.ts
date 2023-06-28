export interface IWatch {
    brand: string;
    model: string;
    image: string;
    battery: string;
    mechanism: 'mechanical' | 'automatic' | 'quartz';
    price: number;
    quantity: number;
    owner: string;
}