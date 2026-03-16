import { NextResponse } from "next/server";

import { initialCarServices } from "@/data/carServices";

export async function GET(request: Request) {
    return NextResponse.json({ carServices: initialCarServices });
}