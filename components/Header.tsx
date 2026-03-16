'use client';

import { useState, useEffect } from "react";
import { MenuItem } from "@/app/types";

import Link from 'next/link';

import { useAuth } from "@/app/context/AuthContext";

import { UserRound, ShoppingCart, Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCart } from "@/app/context/CartContext";

import SearchBar from "./SearchBar";

export default function Header() {
    const [navItems, setNavItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [openMenu, setOpenMenu] = useState<string>("");

    const [input, setInput] = useState("");

    const router = useRouter();
    const { user, login, logout, isLoggedIn } = useAuth();   

    const { toggleCart, isCartOpen, totalItems } = useCart();

    const handleCartClick = () => {
        if (isLoggedIn) {
            toggleCart();
        } else {
            router.push('/customer-login');
        }
    };

    const handleMenuClick = (label: string) => {
        if(openMenu === label) {
            setOpenMenu("");
        } else {
            setOpenMenu(label);
        }
    };

    const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/spare-parts/discover?query=${input}`);
    };

    useEffect(() => {
        let isActive = true;
        setIsLoading(true);
        setError(null);
        const fetchNaviItems = async () => {
            try {
                const response = await fetch('/api/navigation');
                if(!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            
                const data = await response.json();
                if (isActive) {
                    setNavItems(data.mainNavLinks);
                }
            } catch (err) {
                if (isActive) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError(String(err))
                    }
                    
                    console.error("Fetch error:", err);
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);    
                }
            }
        };

        fetchNaviItems();
        return () => {
            isActive = false;
        };
    }, [])

    console.log('Rendered navItems:', navItems);
    console.log('Is Cart Open?', isCartOpen);

    if (error) return <div className="error-banner">{error}</div>;

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto px-4">
                <nav className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/">Logo</Link>
                        {navItems.map(item => {
                            if(item.href) {
                                return (
                                    <Link key={item.label} href={item.href} className="p-4">
                                        {item.label}
                                    </Link>
                                );
                            }
                            else if (item.children) {
                                return (
                                    <div key={item.label} className="relative">
                                        <button onClick={() => handleMenuClick(item.label)}>{item.label}</button>
                                        {openMenu === item.label && (
                                            <ul className="absolute bg-white text-black mt-2 p-2 shadow-lg">
                                                {item.children.map(child => {
                                                    if(child.href) {
                                                        return (
                                                            <li key={child.label}>
                                                                <Link href={child.href} className="block px-4 py-2 hover:bg-gray-100">{child.label}</Link>
                                                            </li>
                                                        )
                                                    } else if(child.slug) {
                                                        return (
                                                            <li key={child.label}>
                                                                <Link href={`/spare-parts/${child.slug}`} className="block px-4 py-2 hover:bg-gray-100">{child.label}</Link>
                                                            </li>
                                                        )
                                                    }

                                                })}

                                            </ul>
                                        )}
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                    <div className="flex items-center gap-6">
                        {/* <button onClick={login}>Test Login</button>
                        <button onClick={logout}>Test Logout</button> */}
                        {/* <button>C</button>
                        <Link href="/customer-login">U</Link> */}
                        <button onClick={handleCartClick} className="relative" title="View Cart">
                            <ShoppingCart className="w-6 h-6 text-white" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#FF0049] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href="/customer-login" title="Login / Register">
                            <UserRound className="w-6 h-6 text-white" />
                        </Link>
                        <Link href="/?lang=ar" title="Switch Language">
                            <Languages className="w-6 h-6 text-gray-300 hover:text-[#FF0049]" />
                        </Link>
                    </div>
                </nav>
            </div>
             <div className="border-t">
                {/* <div className="container mx-auto px-4 py-4">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search for spare parts..."
                        className="w-full p-3 border-2 border-gray-200 rounded-lg border-red-500 outline-none"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </form>
                </div> */}
                <SearchBar value={input} onChange={setInput} onSubmit={handleSearchSubmit} />
            </div>
        </header>
    )
}