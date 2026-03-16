import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { initialSpareParts } from "@/data/spareParts";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page') || '1');
    const limit = 16;

    const filteredParts = initialSpareParts.filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) || p.fitsWith.some(v => v.brand.toLowerCase().includes(query.toLowerCase())) || 
        p.fitsWith.some(v => v.model.toLowerCase().includes(query.toLowerCase()))
    );
    const paginatedParts = filteredParts.slice((page -1) * limit, page * limit);
    const totalPages = Math.ceil(filteredParts.length / limit);

    return NextResponse.json({ searchedParts: paginatedParts, totalPages: totalPages });
}