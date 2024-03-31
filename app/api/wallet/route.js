// directory: C:\cplusplusfiles\ebayclone\app\api\wallet\route.js

import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
    const supabase = createServerComponentClient({ cookies })

    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw Error('No user')
        
        const wallet = await prisma.wallet.findUnique({
            where: { user_id: user?.id },
            include: { Tokens: true }
        })

        if (!wallet) throw Error('No wallet found')
        
        await prisma.$disconnect();
        return NextResponse.json(wallet);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse(error.message, { status: 400 });
    }
}

