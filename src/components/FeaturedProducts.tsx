import { getWixClient } from "@/lib/wix.client.base";
import Products from "@/components/Products";

export default async function FeaturedProducts() {
  const wixClient = getWixClient();
  const {collection} = await wixClient.collections.getCollectionBySlug('feature-products');
  if (!collection?._id) return null;

  const featuredProducts = await wixClient.products
      .queryProducts()
      .hasSome('collectionIds', [collection._id])
      .descending('lastUpdated')
      .find();

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