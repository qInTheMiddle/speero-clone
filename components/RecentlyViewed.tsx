'use client';

import { useState, useEffect } from "react";
import type { SparePart } from "@/app/types";
import SparePartCard from "./SparePartCard";

export default function RecentlyViewed() {
    const [viewedProducts, setViewedProducts] = useState<SparePart[]>([]);

    useEffect(() => {
        const fetchRecentlyViewed = async () => {
            const storedIdsJson = localStorage.getItem('recentlyViewedIds') ?? '[]';
            const storedIds = JSON.parse(storedIdsJson) as string[];
            // console.log('IDs in local storage:', storedIds);

            if (storedIds.length > 0) {
                try {
                    const productPromises = storedIds.map(id => 
                        fetch(`/api/spare-parts/${id}`).then(res => res.json())
                    );

                    const productResults = await Promise.all(productPromises);
                    
                    const products = productResults.map(result => result.sparePart).filter(Boolean);

                    console.log('Products to be set in Recently Viewed:', products);

                    setViewedProducts(products);
                } catch (error) {
                    console.error("Failed to fetch recentlyviewed products", error);
                }
            }
        };

        fetchRecentlyViewed();
    }, []);

    return (
        <>
            {viewedProducts.map(part => (
                <SparePartCard key={part.id} sparePart={part} cartButton={true} />
            ))}
        </>        
    );
}