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

export default function WalletPage() {

    const { user } = useUser() 
    const [wallet, setWallet] = useState([])

    const getWallet = async () => {
        try {
            console.log('user', user)
            if (!user || !user.id) return
            const response = await fetch("/api/wallet")
            console.log('response', response)
            if (!response.ok) {
                console.log('response text', await response.text())
                throw new Error('Failed to fetch wallet')
            }
            const result = await response.json()
            setWallet(result)
            console.log('wallet', result);
            useIsLoading(false)
        } catch (error) {
            console.log(error)
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
                        {wallet.Tokens.map((token) => (
                            <div key={token.id} className="text-sm pl-[50px]">
                                <div className="border-b py-1">
                                    <p>Token ID: {token.id}</p>
                                    <p>Token Name: {token.name}</p>
                                    <p>Token Value: {token.value}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </MainLayout>
        </>
    )
}