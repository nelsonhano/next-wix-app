import ProductDetails from "@/components/ProductDetails";
import { getProduct } from "@/lib/action/product.action"
import { notFound } from "next/navigation";

interface ProductProps {
    params: { slug: string}
}

export default async function name({ params: { slug} }:ProductProps) {
    const product = await getProduct(slug);

    if (!product?._id) notFound()

    return(
        <main className="max-w-7xl mx-auto space-y-10 px-5 py-10">
            <ProductDetails product={product}/>
            {/* <pre className="overflow-x-hidden">
                {JSON.stringify(product, null, 2)}
            </pre> */}
        </main>
    )
} 