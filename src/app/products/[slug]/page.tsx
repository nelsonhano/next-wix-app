import ProductDetails from "@/components/ProductDetails";
import { getProductBYSlug } from "@/lib/action/product.action"
import { notFound } from "next/navigation";

interface ProductProps {
    params: { slug: string}
}


export async function generateMetadata({ params: { slug } }: ProductProps) {
    const product = await getProductBYSlug(slug);

    if (!product) notFound();

    const mainImg = product.media?.mainMedia?.image;

    return {
        title: product.name,
        desciption: 'Get this product on Flow Shop',
        openGraph: {
            images: mainImg?.url
            ? [
                {
                    url: mainImg.url,
                    width: mainImg.width,
                    height: mainImg.height,
                    alt: mainImg.altText || ''
                }
            ]: undefined
        }
    }
}

export default async function name({ params: { slug} }:ProductProps) {
    const product = await getProductBYSlug(slug);

    if (!product?._id) notFound()

    return(
        <main className="max-w-7xl mx-auto space-y-10 px-5 py-10">
            <ProductDetails product={product}/>
            {/* <pre className="overflow-x-hidden">
                {JSON.stringify(product, null, 2)}
            </pre>  */}
        </main>
    )
} 