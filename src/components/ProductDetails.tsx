'use client'

import { products } from "@wix/stores"
import WixImg from "./WixImg"
import Badge from "./ui/badge"
import ProductOptions from "./ProductOptions"
import { useState } from "react"
import { checkInStock, findVarientOption } from "@/lib/utils"
import ProductPrice from "./ProductPrice"
import ProductMedia from "./ProductMedia"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { InfoIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

interface ProductDetails{
    product: products.Product
}

export default function ProductDetails({product}:ProductDetails){
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState<Record<string, string>>(
        product.productOptions?.map((opt) => ({
            [opt.name || '']: opt.choices?.[0].description || '',
        }))?.reduce((acc, curr) => ({...acc, ...curr}), {}) || {}
    )

    const selectedVariant = findVarientOption(product, selectedOption);

    const inStock = checkInStock(product, selectedOption);

    const availableProductQuantity = selectedVariant?.stock?.quantity ?? product.stock?.quantity;

    const availableProductQuantityExceeded = !!availableProductQuantity && (quantity ?? 0) > availableProductQuantity

    const selectedOptionMedia = product.productOptions?.flatMap((option) => {
        const selectedChoice = option.choices?.find((choice) => 
        (choice.description === selectedOption[option.name || ''])
        );

        return selectedChoice?.media?.items || []
    })
    
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

                    <div className="space-y-1.5">
                        <Label htmlFor="quantity">
                            Quantity
                        </Label>
                        <div className="flex items-center gap-2.5">
                            <Input 
                                name="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                    const inputValue = Number(e.target.value);
                                    setQuantity(inputValue < 1 ? 1 : inputValue);
                                }}
                                className="w-24"
                                disabled={!inStock}
                            />
                            {availableProductQuantity && 
                            (availableProductQuantityExceeded || availableProductQuantity < 10) &&
                            (
                                <span className="text-destructive">
                                    Only {availableProductQuantity} left in stock
                                </span>
                            )
                            }
                        </div>
                    </div>
                    {product.additionalInfoSections?.length && (
                        <div className="space-y-1.5 text-muted-foreground">
                            <span className="flex items-center gap-2">
                                <InfoIcon className="size-5" />
                                <span>Additional product infomation</span>
                            </span>
                            <Accordion type="multiple">
                                {product.additionalInfoSections.map(section => (
                                    <AccordionItem value={section.title || ''}>
                                        <AccordionTrigger>{section.title}</AccordionTrigger>
                                        <AccordionContent>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: section.description || ''
                                                }}
                                                className="prose text-sm text-muted-foreground dark:prose-invert"
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </div>        
            </div>
        </main>
    )
}  