'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { SparePart } from "@/app/types";
import SparePartCard from "@/components/SparePartCard";
// import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useRouter } from "next/navigation";

function DiscoverPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    const [matchingParts, setMatchingParts] = useState<SparePart[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState(query || '');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        router.push(`/spare-parts/discover?query=${debouncedSearchTerm}`, { scroll: false });

        if (!debouncedSearchTerm) {
            setIsLoading(false);
            setMatchingParts([]);
            return;
        };
        
        const controller = new AbortController();
        const signal = controller.signal;
        setIsLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/search?query=${debouncedSearchTerm}&page=${currentPage}`, { signal });
                if (!res.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await res.json();
                setMatchingParts(data.searchedParts);
                setTotalPages(data.totalPages);
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                if (!signal.aborted) setIsLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [debouncedSearchTerm, currentPage]);

    return (
        // <div>
        //     <h1>Search Results</h1>
        //     <p>You searched for: {query}</p>
        // </div>
        //  <main className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">
        //         Search Results {query && `for "${query}"`}
        //     </h1>

        //     {isLoading && <p>Loading...</p>}
        //     {error && <p className="text-red-500">{error}</p>}

        //     {!isLoading && !error && (
        //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        //             {matchingParts.length > 0 ? (
        //                 matchingParts.map(part => (
        //                     <SparePartCard key={part.id} sparePart={part} />
        //                 ))
        //             ) : (
        //                 <p>No parts match your search.</p>
        //             )}
        //         </div>
        //     )}
        //  </main>
        <main className="container mx-auto p-4">
            <div className="flex flex-row gap-8">
                 <aside className="w-1/4 hidden md:block">
                    <div className="p-4 border rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Filters</h2>
                        {/* filters */}
                        <p className="text-sm text-gray-500">Filter options.</p>
                    </div>
                 </aside>

                 <div className="w-full md:w-3/4">
                    <div className="mb-6">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={() => {}}/>
                    </div>
                    <h1 className="text-2xl font-bold mb-4">
                        Search Results {query && `for "${query}"`}
                    </h1>

                    {isLoading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!isLoading && !error && (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {matchingParts.length > 0 ? (
                                    matchingParts.map(part => (
                                        <SparePartCard key={part.id} sparePart={part} />
                                    ))
                                ) : (
                                    <p>No parts found for your search.</p>
                                )}
                            </div>
                            {/* Pagination */}
                             <div className="flex justify-center items-center gap-4 mt-8">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                                >
                                    &lt;&lt;
                                </button>
                                <button
                                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                     disabled={currentPage === 1}
                                     className="px-4 py-2 border rounded disabled:opacity-50"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        disabled={currentPage === pageNumber}
                                        className={`px-4 py-2 border rounded ${currentPage === pageNumber ? 'bg-red-500 text-white' : ''}`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                                >
                                    &gt;
                                </button>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                                >
                                    &gt;&gt;
                                </button>
                             </div>
                        </>
                    )}
                 </div>
            </div>
        </main>
    );
}

export default function DiscoverPage() {
    return (
        <Suspense fallback={<div>Loading Search...</div>}>
            <DiscoverPageContent />
        </Suspense>
    );
}