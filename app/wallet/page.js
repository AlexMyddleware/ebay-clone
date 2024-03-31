"use client"

import Link from "next/link";
import { AiFillWallet } from 'react-icons/ai'
import MainLayout from "../layouts/MainLayout";
import { useUser } from "../context/user";
import useIsLoading from "../hooks/useIsLoading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import moment from "moment";

export default function WalletPage() {

    const { user } = useUser() 
    const [wallet, setWallet] = useState([])

    const getWallet = async () => {
        try {
            if (!user && !user?.id) return
            const response = await fetch("/api/wallet")
            const result = await response.json()
            setWallet(result)
            useIsLoading(false)
        } catch (error) {
            toast.error('Something went wrong?', { autoClose: 3000 })
            useIsLoading(false)
        }
    }

    useEffect(() => {
        useIsLoading(true)
        getWallet()
    }, [user])
    

    return (
        <>
            <MainLayout>
                <div id="WalletPage" className="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
                    <div className="bg-white w-full p-6 min-h-[150px]">
                        <div className="flex items-center text-xl">
                            <AiFillWallet className="text-green-500" size={35}/>
                            <span className="pl-4">Wallet</span>
                        </div>
                        {wallet.length < 1 ?
                            <div className="flex items-center justify-center">
                                You have no wallet history
                            </div>
                        : null}

                        {wallet.map(transaction => (
                            <div key={transaction?.id} className="text-sm pl-[50px]">
                                <div className="border-b py-1">

                                    <div className="pt-2">
                                        <span className="font-bold mr-2">Transaction ID:</span>
                                        {transaction?.transaction_id}
                                    </div>


                                    <div className="pt-2">
                                        <span className="font-bold mr-2">Amount:</span>
                                        {transaction?.amount / 100} USD
                                    </div>

                                    <div className="pt-2">
                                        <span className="font-bold mr-2">Transaction Created:</span>
                                        {moment(transaction?.created_at).calendar()}
                                    </div>

                                    <div className="py-2">
                                        <span className="font-bold mr-2">Transaction Type:</span>
                                        {transaction?.type}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    )
}