import { mainNavLinks } from "@/data/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ mainNavLinks: mainNavLinks })
}