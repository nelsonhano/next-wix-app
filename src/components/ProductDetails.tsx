'use client'

import { products } from "@wix/stores"
import WixImg from "./WixImg"
import Badge from "./ui/badge"
import ProductOptions from "./ProductOptions"
import { useState } from "react"
import { findVarientOption } from "@/lib/utils"

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

    const selected = findVarientOption(product, selectedOption)
    return(
        <main className="flex flex-col gap-10 md:flex-row lg:gap-20">
            <div className="basis-2/5">
                <WixImg 
                    scaleToFill
                    mediaIdentifier={product.media?.mainMedia?.image?.url}
                    alt={product.media?.mainMedia?.image?.altText}
                    width={1000}
                    height={1000}
                    className=" sticky top-0"
                />
            </div>
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