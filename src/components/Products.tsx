import Link from "next/link";
import {products} from "@wix/stores";
import {media as wixMedia} from "@wix/sdk";
import WixImg from "@/components/WixImg";
import badge from "@/components/ui/badge";
import Badge from "@/components/ui/badge";
import {getFormattedPrice} from "@/lib/utils";
import DiscountBadge from "@/components/DiscountBadge";

interface IProduct {
    product: products.Product
}


export default function Products({product}: IProduct) {
    const mainImg = product.media?.mainMedia?.image;
    return <>
        <Link href={`/products/${product.slug}`}
            className='border h-full bg-card'
        >
            <div className='overflow-hidden relative'>
                <WixImg
                    mediaIdentifier={mainImg?.url}
                    alt={mainImg?.altText}
                     scaleToFill={true}
                     width={700}
                     height={700}
                    className='transition-transform duration-1000 hover:scale-125'
                />
                <div className='absolute items-center gap-2 flex flex-wrap bottom-3 right-2'>
                    {product.ribbon && <Badge>{product.ribbon}</Badge>}
                    {product.discount && <DiscountBadge data={product.discount} />}
                    <Badge
                        className='bg-secondary text-secondary-foreground font-bold'
                    >{getFormattedPrice(product)}</Badge>
                </div>
            </div>
            <div className='space-y-3 p-3'>
                <h3 className='text-lg font-bold'>{product.name}</h3>
                <div
                    dangerouslySetInnerHTML={{__html: product.description || ''}}
                    className='li ne-clamp-3'
                />
            </div>
        </Link>
    </>
}