// directory: C:\cplusplusfiles\ebayclone\app\wallet\page.js

"use client"

import Link from "next/link";
import { AiFillWallet } from 'react-icons/ai'
import MainLayout from "../layouts/MainLayout";
import { useUser } from "../context/user";
import useIsLoading from "../hooks/useIsLoading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import moment from "moment";
import Tabs from "@/app/components/Tabs";
import { useForm } from "react-hook-form";

export default function WalletPage() {

    const { user } = useUser() 
    const [wallet, setWallet] = useState([])
    const { register, handleSubmit } = useForm();

    const getWallet = async () => {
        try {
            if (!user || !user.id) return
            const response = await fetch("/api/wallet")
            if (!response.ok) {
                throw new Error('Failed to fetch wallet')
            }
            const result = await response.json()
            setWallet(result)
            useIsLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong?', { autoClose: 3000 })
            useIsLoading(false)
        }
    }

    const convertUSDToCoins = async (data) => {
        const amount = Number(data.amount);

        if (!amount) {
            toast.error('Please enter an amount', { autoClose: 3000 });
            return;
        }

        if (Number(wallet.total_balance) < amount) {
            toast.error('Insufficient USD balance', { autoClose: 3000 });
            return;
        }

        if (isNaN(amount)) {
            toast.error('Amount should be a number', { autoClose: 3000 });
            return;
        }

        if (amount <= 0 || !Number.isInteger(amount)) {
            toast.error('Amount should be a positive integer', { autoClose: 3000 });
            return;
        }

        try {
            const response = await fetch('/api/wallet/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    amount: amount,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to convert USD to Calenton coins');
            }
            const result = await response.json();
            setWallet(result);
            toast.success('Conversion successful!', { autoClose: 3000 });
        } catch (error) {
            toast.error('Something went wrong', { autoClose: 3000 });
        }
    };

    useEffect(() => {
        useIsLoading(true)
        getWallet()
    }, [user])
    

    return (
        <MainLayout>
            <div id="WalletPage" className="mt-4 max-w-[1100px] mx-auto">
                <div className="text-2xl font-bold mt-4 mb-4">Wallet</div>

                <div className="relative flex items-baseline gap-4 justify-between mx-auto w-full">

                    <div id="WalletSummary" className="relative -top-[6px] w-[35%] border rounded-lg">
                        <div className="p-4">
                            <div className="flex items-center justify-between my-4">
                                <div className="font-semibold">Wallet Summary</div>
                            </div>

                            <div className="flex items-baseline justify-between text-sm mb-1">
                                <div>Total Balance</div>
                                <div>USD {(wallet.total_balance / 100).toFixed(2)}</div>
                            </div>

                            <div className="flex items-baseline justify-between text-sm mb-1">
                                <div>Calenton Coins</div>
                                <div>{wallet.calenton_coins}</div>
                            </div>

                            <div className="flex items-baseline justify-between text-sm mb-1">
                                <div>Total Number of Tokens</div>
                                <div>{wallet.total_number_of_tokens}</div>
                            </div>
                        </div>
                    </div>
                    <div id="wallet_actions" className="relative -top-[6px] w-[35%] border rounded-lg">
                        <form onSubmit={handleSubmit(convertUSDToCoins)}>
                            <input type="number" placeholder="Amount in USD" {...register("amount", { required: true })} />
                            <button type="submit">Convert USD to Calenton Coins</button>
                        </form>
                        <div className="tabs">
                            {/* <<button className="tab">Withdraw</button>
                            <button className="tab">Deposit</button>> */}
                            <Tabs>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}