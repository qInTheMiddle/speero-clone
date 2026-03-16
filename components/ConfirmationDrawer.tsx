'use client';

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

export default function ConfirmationDrawer() {
    const { isConfirmationOpen, closeConfirmationDrawer, productToConfirm, addToCart } = useCart();

    const handleProceedButton = () => {
        if (productToConfirm) {
            addToCart(productToConfirm);
        }
        closeConfirmationDrawer();
    }

    if(!isConfirmationOpen || !productToConfirm){ 
        return null;
    }

    return (
        // backdrop-blur-sm 
        <div onClick={closeConfirmationDrawer} className="fixed inset-0 bg-black/30 z-50">
             <div onClick={(e) => e.stopPropagation()} className="absolute top-0 left-0 w-full max-w-lg h-full bg-white shadow-xl animate-slide-in-left">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-bold text-[#001641]">Part added to cart</h2>
                    <button 
                        onClick={closeConfirmationDrawer}
                        className="text-2xl text-gray-500 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    {/* <h1>Last added item</h1> */}
                    <div className="flex gap-4">
                        <div className="relative w-20 h-20">
                            <Image src= {productToConfirm.imageUrl} alt="Product Image" fill className="object-contain"/>
                        </div>
                        <div>
                            <p className="font-bold">{productToConfirm.name}</p>
                            <p className="text-sm text-gray-500">PN: {productToConfirm.number}</p>
                            <p className="font-semibold">SAR {productToConfirm.price}</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50">
                    <h3 className="font-bold mb-2">Pamper Your Car</h3>
                    <h1>Cards</h1>
                </div>

                 <div className="flex gap-4 p-4 border-t">
                    <button
                        onClick={closeConfirmationDrawer}
                        className="flex-1 bg-gray-200 py-3 rounded-lg font-bold"
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={handleProceedButton}
                        className="flex-1 bg-[#41D3BD] text-white py-3 rounded-lg font-bold"
                    >
                        Proceed to Checkout
                    </button>
                 </div>
             </div>

        </div>
    ); 
}