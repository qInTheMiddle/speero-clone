export type PartType = 'Original' | 'Replacement';

export interface Vehicle {
    brand: string;
    model: string;
    yearRange: string;
}

export interface SparePart {
    id: string;
    type: PartType;
    imageUrl: string;
    name: string;
    number: string;
    price: number;
    category: string;
    fitsWith: Vehicle[];
    seller?: string;
    imageUrls?: string[];
    countryOfOrigin?: string;
    description?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Cart {
    items: CartItem[];
}

export interface CartItem {
    product: SparePart | CarService;
    quantity: number;
}

export type ServiceType = 'Periodic Services' | 'Detailing Services' | 'Denting And Painting' | 'Car Spa And Cleaning' | 'Windshields And Lights' | 'Custom Services' | 'Ac Services And Repair' | 'Tyres And Wheel Care' | 'General';

export interface CarService {
    id: string;
    name: string;
    imageUrl: string;
    number?: string;
    price: number;
    discount: number;
    description: string;
    serviceType: ServiceType;
    provider: string;
}

export interface MenuItem {
    label: string;
    href?: string;
    children?: MenuItem[];
    slug?: string;
    imageUrl?: string;
}


    