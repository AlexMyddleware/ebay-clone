'use client'

export default function Footer() {
    return (
        <>
            <div id="Footer" className="border-t mt-20 px-2">
                <div className="flex items-baseline justify-between w-full mx-auto max-w-[1200px] py-10">
                    <ul className="text-gray-700">
                        <li className="font-bold text-lg">Buy</li>
                        <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">Registration</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Bidding & buying help</li>
                    </ul>

                    <ul className="text-gray-700">
                        <li className="font-bold text-lg">Sell</li>
                        <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">Selling your Token</li>
                    </ul>

                    <ul className="text-gray-700">
                        <li className="font-bold text-lg">About Canlenton</li>
                        <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">Company info</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">News</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Investors</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Carreers</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Government relations</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Policies</li>
                    </ul>
                </div>
            </div>
        </>
    )
  }
  