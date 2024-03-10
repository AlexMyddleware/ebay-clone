'use client'

import Link from "next/link";
import { useState } from "react";

export default function MainLayout() {

    return (
        <>
            <div id="MainHeader" className="border-b">
                <nav className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <div className="flex items-center w-full bg-white">
                        <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
                            <Link href="/">
                                <img width="500" src="/images/logo.jpg" />
                            </Link>

                            <div className="w-full">
                                <div className="relative">
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
  }
  