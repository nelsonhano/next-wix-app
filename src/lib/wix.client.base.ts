import {env} from "@/env";
import {
    checkout,
    backInStockNotifications,
    currentCart,
    orders,
    recommendations
} from "@wix/ecom";
import {reviews} from '@wix/reviews';
import {redirects} from "@wix/redirects";
import {members} from "@wix/members";
import {files} from "@wix/media";
import {collections, products} from '@wix/stores';
import {createClient, OAuthStrategy} from "@wix/sdk";

export const getWixClient = () => {
    return createClient({
        modules: {
            products,
            collections,
            currentCart,
            checkout,
            redirects,
            backInStockNotifications,
            reviews,
            members,
            files,
            orders,
            recommendations
        },
        auth: OAuthStrategy({
            clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID
        })
    })
}

