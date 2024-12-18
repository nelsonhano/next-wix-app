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


export function findVarientOption(product: products.Product, selectedOption: Record<string, string>){
  if(!product.manageVariants) return null;

  return (
    product.variants?.find((variant) => {
      return Object.entries(selectedOption).every(
        ([key, value]) => variant.choices?.[key] === value,
      );
    }) || null
  )
}


export function checkInStock(
  product: products.Product, 
  selectedOption: Record<string, string>
){
  const variant = findVarientOption(product, selectedOption);

  if (!variant) return null

  return variant ? variant.stock?.quantity !== 0 && variant.stock?.inStock
  : product.stock?.inventoryStatus === products.InventoryStatus.IN_STOCK || 
    product.stock?.inventoryStatus === products.InventoryStatus.PARTIALLY_OUT_OF_STOCK
}