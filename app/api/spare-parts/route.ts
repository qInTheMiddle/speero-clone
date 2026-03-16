import { NextResponse } from "next/server";

import { initialSpareParts } from "@/data/spareParts";

export async function GET(request: Request) {
    return NextResponse.json({ spareParts: initialSpareParts });
}