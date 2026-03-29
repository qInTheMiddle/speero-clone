'use client';
// import { useState } from "react";
// import { useRouter } from "next/router";
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
    // const [input, setInput] = useState("");
    // const router = useRouter();


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (input.trim()) {
        //     router.push(`/spare-parts/discover?query=${input}`);
        // }
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full bg-white h-[34px]">
            <input
                type="text"
                placeholder="Search by name or part number..."
                className="w-full h-full px-3 pr-10 text-[#0d0630] focus:outline-none"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <span 
                className="absolute right-1 top-1 w-5 h-5 cursor-pointer 
                bg-[url(/image/icons/search.svg)] bg-center bg-no-repeat bg-[length:15px] opacity-25 hover:opacity-100"
            />
        </form>
    );
}