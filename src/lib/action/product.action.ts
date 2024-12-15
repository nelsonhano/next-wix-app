'use server';

import { getWixClient } from "@/lib/wix.client.base";
const wixClient = getWixClient();

type sortTypes = 'last_updated' | 'price_desc' | 'price_asc';

interface QueryProductFilter {
    collectionId?: string[] | string;
    sort?: sortTypes;
}

export async function getCart() {
    try {
        return await wixClient.currentCart.getCurrentCart();
    }catch (error) {
        if ((error as any).details.applicationError.code === 'OWNED_CART_NOT_FOUND'){
            return null
        } else {
            throw error;
        }
    }
}

export async function queryProducts({collectionId, sort='last_updated'}:QueryProductFilter) {
    let query = await wixClient.products.queryProducts()

    const collectionIdsArray = collectionId ? Array.isArray(collectionId) ? collectionId : [collectionId]: [];

    if (collectionIdsArray.length > 0) {
        query.hasSome('collectionIds', [collectionIdsArray])
    }

    switch (sort) {
        case 'price_asc':
            query = query.ascending('price')
            break;
        case 'price_desc':
            query = query.ascending('price')
            break;
        case 'last_updated':
            query = query.ascending('lastUpdated')
            break;
    }

    return query.find();
}


export async function getProduct(slug: string) {
    const {items} = await wixClient.products
        .queryProducts()
        .eq('slug', slug)
        .limit(1)
        .find() 

    const product = items[0];

    if (!product || !product.visible) {
        return null
    }

    return product
}