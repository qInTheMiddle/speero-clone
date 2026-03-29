'use client';

import { useState, useEffect } from "react";
import { MenuItem } from "@/app/types";

import Link from 'next/link';

import { useAuth } from "@/app/context/AuthContext";

import { UserRound, ShoppingCart, Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCart } from "@/app/context/CartContext";

import SearchBar from "./SearchBar";

import Image from "next/image";

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
        <>
        <div className="block h-7 w-full bg-[#25D366] text-white text-center text-xs font-bold">
            <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block h-full flex items-center justify-center py-1"
            >
                Click here to contact us via WhatsApp
            </a>
        </div>
        <header className="top-0 z-[99] bg-white h-[72px] shadow-[0_2px_10px_0_rgba(0,0,0,0.1)] flex items-center justify-center w-full">
            <div className="w-full max-w-[1320px] box-border">
                <div className="flex justify-between items-center h-[73px] w-full">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image src="/image/logo/clone-logo.png" alt="Speero" width={100} height={49} className="h-[49px] w-[100px]  " />
                        </Link>
                        {/* <Link href="/" className="text-[16px] font-bold text-[#0d0630] hover:text-[#EF4444] transition-colors p-4">Logo</Link> */}
                        {navItems.map(item => {
                            if(item.href) {
                                return (
                                    <Link key={item.label} href={item.href} className="text-[16px] font-bold text-[#0d0630] hover:text-[#EF4444] transition-colors p-4">
                                        {item.label}
                                    </Link>
                                );
                            }
                            else if (item.children) {
                                return (
                                    <div key={item.label} className="relative text-[16px] font-bold text-[#0d0630] hover:text-[#EF4444] transition-colors p-4">
                                        <button 
                                            onClick={() => handleMenuClick(item.label)} 
                                            className="cursor-pointer flex items-center justify-center w-[189px] h-[46px] gap-2 font-bold text-[16px] text-[#0d0630]"
                                        >
                                            {item.label}
                                            <Image src="/image/icons/arrow.svg" alt="" width={11} height={10} />
                                        </button>
                                        {openMenu === item.label && (
                                            <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-100 shadow-lg rounded-lg min-w-48 py2">
                                                {item.children.map(child => {
                                                    if(child.href) {
                                                        return (
                                                            <li key={child.label}>
                                                                <Link href={child.href} className="block py-2 text-[13px] font-bold text-[#0d0630] hover:text-[#EF4444] transition-colors p-4">{child.label}</Link>
                                                            </li>
                                                        )
                                                    } else if(child.slug) {
                                                        return (
                                                            <li key={child.label}>
                                                                <Link href={`/spare-parts/${child.slug}`} className="block py-2 text-[13px] font-bold text-[#0d0630] hover:text-[#EF4444] transition-colors p-4">{child.label}</Link>
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
                    <div className="flex items-center gap-0">
                        {/* <button onClick={login}>Test Login</button>
                        <button onClick={logout}>Test Logout</button> */}
                        {/* <button>C</button>
                        <Link href="/customer-login">U</Link> */}
                        <button 
                            onClick={handleCartClick} 
                            className="relative h-[46px] w-[46px] flex items-center justify-center rounded-[8px] 
                            text-[#0d0630] hover:text-[#E41F38] transition-all duration-300 transition-colors cursor-pointer"  
                            title="View Cart"
                        >
                            <Image src="/image/icons/checkout.svg" alt="Cart" width={20} height={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#E41F38] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href="/customer-login" title="Login / Register" className="text-[#0d0630] hover:text-[#E41F38] transition-colors">
                             <Image src="/image/icons/user-1.svg" alt="User" width={23} height={30} />
                        </Link>
                        <Link href="/?lang=ar" title="Switch Language" className="block p-[8px] h-[29px] text-[20px] font-bold leading-[26px] text-[#0d0630] self-start">
                            {/* <Languages className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors hover:text-[#EF4444]" /> */}
                            ع
                        </Link>
                    </div>
                </div>
            </div>
        </header>
        <div className="bg-[#E41F38] p-[5px] flex justify-center">
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
            <div className="w-full max-w-[1306px]">
                <SearchBar value={input} onChange={setInput} onSubmit={handleSearchSubmit} />
            </div>
        </div>
        </>
    )
}