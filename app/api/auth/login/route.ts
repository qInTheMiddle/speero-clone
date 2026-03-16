import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { code } = body;

        const validEmail = "test@example.com";
        const validPassword = "password123";
        const validCode = "1234";

        // if (email === validEmail && password === validPassword) {
        if (code === validCode) {
            return NextResponse.json({ message: "Login successful" });
        } else {
            return NextResponse.json({ message: "Invalid code" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: "An error occured" }, { status: 500 });
    }
}