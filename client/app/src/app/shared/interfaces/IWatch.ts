export interface IWatch {
    _id?: string;
    brand: string;
    model: string;
    image: string;
    battery: string;
    mechanism: string; // Update the type to match the possible values
    price: number;
    strap: string;
    glass: string;
    waterResistance: string;
    rating?: {
      userId: string;
      userRating: number;
      _id: string;
    }[];
  }