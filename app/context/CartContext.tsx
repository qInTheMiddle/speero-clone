'use client';

import { createContext, useContext, useState } from "react";
import type { SparePart, CarService, CartItem } from "../types";
import { initialCart } from '@/data/user';

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    isCartOpen: boolean;
    addToCart: (item: SparePart | CarService) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, action: 'increment' | 'decrement') => void;
    clearCart: () => void;
    toggleCart: () => void;
    productToConfirm: SparePart | CarService | null;
    openConfirmationDrawer: (product: SparePart | CarService) => void;
    isConfirmationOpen: boolean;
    closeConfirmationDrawer: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(initialCart.items);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0 );

    const [productToConfirm, setProductToConfirm] = useState<SparePart | CarService | null>(null);

    const openConfirmationDrawer = (product: SparePart | CarService) => {
        setProductToConfirm(product);
        setIsConfirmationOpen(true);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const addToCart = (productToAdd: SparePart | CarService) => {
        // console.log("Adding to cart:", item.name);
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === productToAdd.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id === productToAdd.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else {
                return [...prevItems, { product: productToAdd, quantity: 1 }]
            }
        });
        // setIsCartOpen(true);
        setIsConfirmationOpen(true);
    };

    const removeFromCart = (idToRemove: string) => {
        // console.log("Removing from cart:", id);
        setItems(prevItems => {
            return prevItems.filter(item => item.product.id !== idToRemove);
        });
    };

    const updateQuantity = (idToUpdate: string, action: 'increment' | 'decrement') => {
        // console.log(`updating ${id} with action: ${action}`);
        setItems((prevItems) => prevItems.map((item) => {
            if (item.product.id === idToUpdate) {
                return { ...item, quantity: action === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1) };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setItems([]);
    };

    const closeConfirmationDrawer = () => {
        setIsConfirmationOpen(false);
    };

    const value = {
        items,
        totalItems,
        subtotal,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        productToConfirm,
        openConfirmationDrawer,
        isConfirmationOpen,
        closeConfirmationDrawer,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within an AuthProvider');
    }
    return context;
};