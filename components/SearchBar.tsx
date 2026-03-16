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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by name or part number..."
                className="w-full p-3 border-2 border-gray-300 bg-gray-300 text-black rounded-lg focus:border-red-500 outline-none"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </form>
    );
}