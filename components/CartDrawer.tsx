'use client';

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
    const { isCartOpen, items, toggleCart, removeFromCart, updateQuantity } = useCart();

    if (!isCartOpen) {
        return null;
    }

    return (
        <div onClick={toggleCart} className="fixed inset-0 bg-black/30 bg-opacity-50 z-50 flex justify-end">
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-0 right-0 w-full max-w-lg h-full bg-gray-400 shadow-xl p-6 overflow-y-auto"
            >
            <div className="w-full max-w-lg h-full bg-blue-900 shadow-xl p-6 overflow-y-auto"> 
                <div className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold">Shopping Cart</h2>   
                    <button onClick={toggleCart} className="text-3xl">&times;</button>
                </div>
                <div className="space-y-4"> 
                    {items.length > 0 ? (
                        items.map(item => (
                            <div key={item.product.id} className="flex gap-4 border-b pb-4">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-contain" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold">{item.product.name}</p>
                                    {'partNumber' in item.product && (
                                        <p className="text-sm">PN: {item.product.number}</p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button 
                                            className="w-6 h-6 bg-red-700 rounded-full text-lg font-bold flex items-center justify-center hover:bg-red-900"
                                            onClick={() => updateQuantity(item.product.id, 'decrement')}
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                        <button 
                                            className="w-6 h-6 bg-green-700 rounded-full text-lg font-bold flex items-center justify-center hover:bg-green-900"
                                            onClick={() => updateQuantity(item.product.id, 'increment')}
                                        >
                                            +
                                        </button>
                                        </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">SAR {item.product.price * item.quantity}</p>
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-semibold"
                                        title="Remove Item"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

            </div>
            </div>
        </div>
    )
}