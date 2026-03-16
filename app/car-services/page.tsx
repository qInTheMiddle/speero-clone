'use client';

import { useState, useEffect } from "react";
import type { CarService } from "../types";
import Header from "@/components/Header";
import CarServiceCard from "@/components/CarServiceCard";

export default function CarServicePage() {
    const [allServices, setAllServices] = useState<CarService[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('default');
    const [selectedCity, setSelectedCity] = useState('');

    const serviceCategories = ["Top Selling", "All", "Detailing Services", "Periodic Services", "Windshields And Lights", "Denting And Painting",
        "CustomServices", "Tyres And Wheel Care", "General", "Ac Service And Repair", "Car Spa And Cleaning",
    ];

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchServices = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('/api/car-services/')
                if (!res.ok) throw new Error("Failed to fetch car services");
                const data = await res.json();
                setAllServices(data.carServices);
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    console.log('Fectch aborted');
                } else {
                    setError(err instanceof Error ? err.message : 'An unexpected error occurred');
                }
            } finally {
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        fetchServices();

        return () => controller.abort();
    }, []);

    let displayedServices = [...allServices];

    if (activeCategory !== 'All') {
        displayedServices = displayedServices.filter(
            service => service.serviceType === activeCategory
        );
    }

    if (sortOrder === 'price-asc') {
        displayedServices.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
        displayedServices.sort((a, b) => b.price - a.price);
    }
    
    return (
        <>
            {/* <Header /> */}
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">
                    Car Services
                </h1>
                {/* <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <p>Filter and sort controls</p>
                </div>  */}
                <div className="mb-8">
                     <div className="flex space-x-4 border-b pb-2 mb-4 overflow-x-auto">
                        {serviceCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-t-lg font-semibold whitespace-nowrap ${
                                    activeCategory === category 
                                    ? 'border-b-2 border-red-500 text-red-500'
                                    : 'text-gray-500'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                     </div>
                     <div className="flex items-center gap-4">
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="p-2 border rounded-lg bg-white text-black"
                        >
                            <option value="">Select City</option>
                            <option value="Riyadh">Riyadh</option>
                            <option value="Jeddah">Jeddah</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="p-2 border rounded-lg bg-white text-black"
                        >
                            <option value="default">Sort By</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                     </div>
                </div>
                {isLoading && <p>Loading services...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {displayedServices.map(service => (
                            <CarServiceCard key={service.id} carService={service} />
                         ))}
                    </div>
                )}
            </main>
        </>
    );
}