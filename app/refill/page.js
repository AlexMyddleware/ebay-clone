"use client";

import { useEffect, useState } from 'react';
import Product from '@/app/components/Product';
import MainLayout from '@/app/layouts/MainLayout';
import useIsLoading from "@/app/hooks/useIsLoading"

export default function Home() {

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    useIsLoading(true)

    const response = await fetch('/api/products')
    const prods = await response.json()

    setProducts([])
    setProducts(prods)
    useIsLoading(false)
  }

  useEffect(() => { getProducts() }, [])

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-2xl font-bold mt-4 mb-6 px-4 text-center">Put USD into your account</div>
  
          <div className="flex justify-center">
            {products.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  )
}
