'use client';

import { useState, useEffect, use } from "react";
import type { SparePart } from "@/app/types";
import Image from "next/image";

import { useParams } from 'next/navigation';
import { useCart } from "@/app/context/CartContext"
// import Header from "@/components/Header";
import { ShoppingCart } from "lucide-react";

// this is a failed attempt that triggered an infinite loop:
// async function getSparePart(id: string) {
//     const res = await fetch(`http://localhost:3000/api/spare-parts/${id}`);

//     if(!res.ok) {
//         return null;
//     }

//     const data = await res.json();
//     return data.sparePart;
// }

export default function SparePartPage() {
    const [sparePart, setSparePart] = useState<SparePart | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const id = params.id as string;

    const { openConfirmationDrawer } = useCart();

    // const { id } = await params;

    useEffect(() => {
        try {
            const storedIdsJson = localStorage.getItem('recentlyViewedIds') ?? '[]';
            const storedIds = JSON.parse(storedIdsJson);
            if (!storedIds.includes(id)) {
                const newIds =[id, ...storedIds].slice(0, 10);
                localStorage.setItem('recentlyViewedIds', JSON.stringify(newIds));
            }
        } catch (error) {
            console.error("Failed to update recently viewed items", error);
        }

        let isActive = true;
        setIsLoading(true);
        setError(null)
        if(id) {
            const fetchPart = async () => {
                try {
                    const res = await fetch(`/api/spare-parts/${id}`);
                    if (!res.ok) {
                        throw new Error('Part not found');
                    }
                    const data = await res.json();
                    if (isActive) {
                        setSparePart(data.sparePart);
                    }
                } catch (err) {
                    if (isActive) {
                        setError(err instanceof Error ? err.message : 'An error occured');
                    }
                } finally {
                    if (isActive) {
                        setIsLoading(false);
                    }
                }
            };
            fetchPart();
            return () => {
                isActive = false;
            }
        }

    }, [id]);

    
    
    // const sparePart = await getSparePart(id);
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!sparePart) return <div>Sorry, it could not be found</div>

    return (
        <div>
            {/* <Header /> */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <div className="relative w-100 h-100 aspect-square border rounded-lg overflow-hidden">
                            <Image
                                src={sparePart.imageUrl}
                                alt={sparePart.name}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">* Image is illustrative and may not match the final product</p>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{sparePart.name}</h1>

                        <div className="mt-4 text-sm text-gray-800 space-y-1 border-b pb-4">
                            <p><span>Part Number:</span> <span className="font-medium">{sparePart.number}</span></p>
                            <p><span>Make:</span> <span className="font-medium">{sparePart.type}</span></p>
                            <p><span>Country of Origin:</span> <span className="font-medium">{sparePart.countryOfOrigin || 'N/A'}</span></p>
                        </div>

                        <div className="my-6">
                            <p className="text-2xl font-extrabold">SAR {sparePart.price}</p>
                            <p className="text-sm text-gray-500">VAT Included</p>
                        </div>

                        <button 
                            onClick={() => openConfirmationDrawer(sparePart)}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 
                                transition-colors flex items-center justify-center gap-2
                            "
                        >
                            <ShoppingCart className="w-6 h-6" />
                            <span>Add to Cart</span>
                        </button>
                        <div className="mt-12">
                            <h2 className="text-xl font-bold mb-4">Fitment</h2>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border">Manufacturer</th>
                                        <th className="p-2 border">Car Name</th>
                                        <th className="p-2 border">Year of Manufacture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sparePart.fitsWith.map(vehicle => (
                                        <tr key={vehicle.model}>
                                            <td className="p-2 border">{vehicle.brand}</td>
                                            <td className="p-2 border">{vehicle.model}</td>
                                            <td className="p-2 border">{vehicle.yearRange}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="text-sm text-gray-600 mt-2">* Providing the VIN number on the cart page ensures the part 
                                fits your car</p>
                        </div>
                    </div>
                </div> 
            </main>
        </div>
    );
}