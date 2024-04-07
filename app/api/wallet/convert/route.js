import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
    const supabase = createServerComponentClient({ cookies })

    try {
        const { data: { user } } = await supabase.auth.getUser()

        console.log('WE ARE IN THE ORDERS API ROUTE GANDALF');
        // console log the current route
        // console.log('ROUTE', req)

        if (!user) throw Error('No user')

        const wallet = await prisma.wallet.findUnique({
            where: { user_id: user?.id },
            select: {
                total_balance: true,
                calenton_coins: true,
            }
        })

        if (!wallet) throw Error('No wallet found')

        console.log('WALLET', wallet);

        const body = await req.json();
        const amount = Number(body.amount);
        
        console.log('amount', amount)

        if (wallet.total_balance < amount) {
            throw Error('Insufficient USD balance');
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

        console.log('UPDATED WALLET', updatedWallet);

        await prisma.$disconnect();
        
        //return res.status(200).json(updatedWallet);
        return NextResponse.json(updatedWallet);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}