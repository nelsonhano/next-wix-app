import {products} from "@wix/stores";
import Badge from "@/components/ui/badge";

interface DiscountBadge {
    data: products.Discount;
}

export default function DiscountBadge({data}: DiscountBadge) {
    if (data.type !== 'PERCENT'){
        return null;
    }

    return <Badge>-{data.value}%</Badge>
}