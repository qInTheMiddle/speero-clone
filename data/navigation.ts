import type { MenuItem } from "../app/types";

export const mainNavLinks: MenuItem[] =[
    {
        label: 'Car Manufacturers',
        children: [
            {
                label: 'Toyota',
                href: '/m-toyota',
                imageUrl: '/image/parts/brands/toyota-colored.png',
            },
            {
                label: 'Hyundai',
                href: '/m-hyundai',
                imageUrl: '/image/parts/brands/hyundai-colored.png',
            },{
                label: 'Kia',
                href: '/m-kia',
                imageUrl: '/image/parts/brands/kia-colored.png',
            },{
                label: 'Nissan',
                href: '/m-nissan',
                imageUrl: '/image/parts/brands/nissan-colored.png',
            },{
                label: 'Ford',
                href: '/m-ford',
                imageUrl: '/image/parts/brands/ford-colored.png',
            },{
                label: 'Chevrolet',
                href: '/m-chevrolet',
                imageUrl: '/image/parts/brands/chevrolet-colored.png',
            },{
                label: 'Honda',
                href: '/m-honda',
                imageUrl: '/image/parts/brands/honda-colored.png',
            },{
                label: 'BMW',
                href: '/m-bmw',
                imageUrl: '/image/parts/brands/bmw-colored.png',
            },{
                label: 'GMC',
                href: '/m-gmc',
                imageUrl: '/image/parts/brands/gmc-colored.png',
            },{
                label: 'Lexus',
                href: '/m-lexus',
                imageUrl: '/image/parts/brands/lexus-colored.png',
            },{
                label: 'Changan',
                href: '/m-changan',
                imageUrl: '/image/parts/brands/changan-colored.png',
            },

        ]

    },
    {
        label: 'Spare Parts Market',
        children: [
            {
                label: 'Discover Spare Parts',
                slug: 'discover',
            },
            {
                label: 'Bumpers Grill and Font End',
                slug: 'bumpers-grill-and-font-end',
            },{
                label: 'Engine Gears and its accessories',
                slug: 'engine-gears-and-its-accessories',
            },{
                label: 'Headlights and Rear lights',
                slug: 'headlights-and-rear-lights',
            },{
                label: 'Brakes and Brake Pads',
                slug: 'brakes-and-brake-pads',
            },{
                label: 'Doors Fender and Hood',
                slug: 'doors-fender-and-hood',
            },{
                label: 'Exhaust',
                slug: 'exhaust',
            },{
                label: 'Fuel System',
                slug: 'fuel-system',
            },{
                label: 'Axies Differential and Bearings',
                slug: 'axies-differential-and-bearings',
            },{
                label: 'Spark plugs Filters and Time Belt',
                slug: 'Spark-plugs-filters-and-time-belt',
            },{
                label: 'Suspension Arms and Control Arms',
                slug: 'suspension-arms-and-control-arms',
            },{
                label: 'Steering Wheel and its accessories',
                slug: 'steering-wheel-and-its-accessories',
            },{
                label: 'AC and Cooling System',
                slug: 'ac-and-cooling-system',
            },

        ]
    },
    {
        label: 'Car Services',
        href: '/car-services',
    },
    {
        label: 'Blog',
        href: '/blog',
    },
]