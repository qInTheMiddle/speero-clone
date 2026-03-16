import type { User, Cart } from '../app/types';

export const initialUser: User = {
    id: '1',
    name: 'SparePartCollector',
    email: 'sparepartlover@simp.com'
}

export const initialCart: Cart ={
    items: [
        // {
        //     product: {
        //         id: '1',
        //         type: 'Original',
        //         imageUrl: '/image/parts/brake-pads.jpg',
        //         name: 'Brake Pads',
        //         number: '0123456789',
        //         price: 186,
        //         category: 'Body, bumpers, and grilles',
        //         fitsWith: [
        //             {
        //                 brand: 'Nissan',
        //                 model: 'Nissan Something',
        //                 yearRange: '2022-2023'
        //             }
        //         ]
        //     },
        //     quantity: 2
        // }
    ]
}