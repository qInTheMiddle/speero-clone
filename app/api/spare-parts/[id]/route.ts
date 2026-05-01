import { NextResponse } from "next/server";
import { initialSpareParts } from "@/data/spareParts";

export async function GET( request: Request, { params } : { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const sparePart = initialSpareParts.find(p => p.id === id);

    if (!sparePart) {
        return NextResponse.json({ message: "Part not found" }, { status: 404 });
    }

    return NextResponse.json({ sparePart });
}