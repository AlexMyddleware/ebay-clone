// // directory: C:\cplusplusfiles\ebayclone\app\api\wallet\convert.js

// import prisma from "@/app/libs/Prisma";
// import { NextResponse } from "next/server";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// export default async function handler(req, res) {
//     console.log('API route hit');
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     const supabase = createServerComponentClient({ cookies: req.body.cookies })

//     try {
//         const { data: { user } } = await supabase.auth.getUser()

//         if (!user) throw Error('No user')

//         const wallet = await prisma.wallet.findUnique({
//             where: { user_id: user?.id },
//             select: {
//                 total_balance: true,
//                 calenton_coins: true,
//             }
//         })

//         if (!wallet) throw Error('No wallet found')

//         const amount = req.body.amount;
//         console.log('amount', amount)

//         if (wallet.total_balance < amount) {
//             throw Error('Insufficient USD balance');
//         }

//         const updatedWallet = await prisma.wallet.update({
//             where: { user_id: user?.id },
//             data: {
//                 total_balance: wallet.total_balance - amount,
//                 calenton_coins: wallet.calenton_coins + amount,
//             },
//             select: {
//                 total_balance: true,
//                 calenton_coins: true,
//             }
//         })

//         await prisma.$disconnect();
//         return res.status(200).json(updatedWallet);
//     } catch (error) {
//         console.log(error);
//         await prisma.$disconnect();
//         return res.status(400).json({ message: error.message });
//     }
// }