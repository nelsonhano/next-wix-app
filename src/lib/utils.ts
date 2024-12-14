import {products} from '@wix/stores'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
    price: number | string = 0,
    currency: string = 'USD'
) {
  return Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(price))
}

export function getFormattedPrice(product: products.Product){
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && (minPrice !== maxPrice)) {
    return `From ${formatCurrency(minPrice, product.priceData?.currency)}`
  } else {
    return (
        product.priceData?.formatted?.discountedPrice || product.priceData?.formatted?.price || 'n/a'
    )
  }
}