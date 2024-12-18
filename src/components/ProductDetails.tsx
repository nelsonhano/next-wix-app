'use client'

import { products } from "@wix/stores"
import WixImg from "./WixImg"
import Badge from "./ui/badge"
import ProductOptions from "./ProductOptions"
import { useState } from "react"
import { checkInStock, findVarientOption } from "@/lib/utils"
import ProductPrice from "./ProductPrice"
import ProductMedia from "./ProductMedia"

interface ProductDetails{
    product: products.Product
}

export default function ProductDetails({product}:ProductDetails){
    const [quantity, setQuantity] = useState()
    const [selectedOption, setSelectedOption] = useState<Record<string, string>>(
        product.productOptions?.map((opt) => ({
            [opt.name || '']: opt.choices?.[0].description || '',
        }))?.reduce((acc, curr) => ({...acc, ...curr}), {}) || {}
    )

    const selectedVariant = findVarientOption(product, selectedOption)

    const inStock = checkInStock(product, selectedOption)

    return(
        <main className="flex flex-col gap-10 md:flex-row lg:gap-20">
            <ProductMedia media={product.media?.items || []}/> 
            <div className="basis-3/5 space-y-5">
                <div className="space-y-2.5">
                    <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
                    {product.brand && (
                        <div className="text-muted-foreground">{product.brand}</div>
                    )}
                    {product.ribbon && (
                        <Badge className="block">{product.ribbon}</Badge>
                    )}
                    {product.description && (
                        <div
                            className="prose dark:proi" 
                            dangerouslySetInnerHTML={{__html: product.description }}
                        />
                    )}
                    <ProductPrice product={product} selectedVariant={selectedVariant} />
                    <ProductOptions 
                        product={product}
                        selectedOption={selectedOption} 
                        setSelectedOption={setSelectedOption} 
                    />
                </div>        
            </div>
        </main>
    )
}