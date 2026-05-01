import { NextResponse } from "next/server";
import { initialCarServices } from "@/data/carServices";

export async function GET( request: Request, { params } : { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const carService = initialCarServices.find(p => p.id === id);

    if (!carService) {
        return NextResponse.json({ message: "Part not found" }, { status: 404 });
    }

    return NextResponse.json({ carService });
}