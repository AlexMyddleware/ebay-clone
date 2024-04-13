import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
    const supabase = createServerComponentClient({ cookies })

    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw Error('No user')

        const wallet = await prisma.wallet.findUnique({
            where: { user_id: user?.id },
            select: {
                total_balance: true,
                calenton_coins: true,
            }
        })

        if (!wallet) throw Error('No wallet found')

        const body = await req.json();
        const amount = Number(body.amount);
        
        if (wallet.total_balance < amount) {
            throw Error('Insufficient USD balance');
        }

        if (isNaN(amount)) {
            throw Error('Amount should be a number');
        }

        if (amount <= 0 || !Number.isInteger(amount)) {
            throw Error('Amount should be a positive integer');
        }

        const updatedWallet = await prisma.wallet.update({
                        where: { user_id: user?.id },
                        data: {
                            total_balance: wallet.total_balance - (amount * 100),
                            calenton_coins: wallet.calenton_coins + amount,
                        },
                        select: {
                            total_balance: true,
                            calenton_coins: true,
                        }
                    })

        await prisma.$disconnect();
        
        return NextResponse.json(updatedWallet);
    } catch (error) {
        await prisma.$disconnect();
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}