import { getWixClient } from "@/lib/wix.client.base";
import Products from "@/components/Products";
import {getCollectionBySlug} from "@/lib/action/collection.action";
import { queryProducts } from "@/lib/action/product.action";

export default async function FeaturedProducts() {
  const collection = await getCollectionBySlug('feature-products');

  if (!collection?._id) return null;

  const featuredProducts = await queryProducts({ collectionId: collection._id })

  if (!featuredProducts.items.length) {
    return null;
  }


  return <section>
    <div className='space-y-5'>
      <h2 className='text-2xl font-bold'>Featured Products</h2>
      <div className='flex flex-col gap-2 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {featuredProducts.items.map(product => (
         <Products product={product} key={product._id} />
        ))}
      </div>
      {/*<pre>*/}
      {/*  {JSON.stringify(featuredProducts, null, 2)}*/}
      {/*</pre>*/}
    </div>
  </section>;
}