'use client'

import { products } from "@wix/stores"
import WixImg from "./WixImg"

interface ProductDetails{
    product: products.Product
}

export default function ProductDetails({product}:ProductDetails){
    return(
        <main className="flex flex-col gap-10 md:flex-row lg:gap-20">
            <div>
                <WixImg 
                    scaleToFill
                    mediaIdentifier={product.media?.mainMedia?.image?.url}
                    alt={product.media?.mainMedia?.image?.altText}
                    width={1000}
                    height={1000}
                    className=" sticky top-0"
                />
            </div>
            <div>details</div>
        </main>
    )
}