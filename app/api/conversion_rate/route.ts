import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { code11, code22, amountToconvert } = body;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/d05aa0dd619354a79346ef1b/pair/${code11}/${code22}/${amountToconvert}`)
        const data = await response.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error({error: 'Error converting data', err}, {status: 500})
    }
};