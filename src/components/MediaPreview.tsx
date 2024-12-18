import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import WixImg from "./WixImg";

interface MediaPreview {
    mediaItem: products.MediaItem;
    isSelected: boolean;
    onSelect: () => void;
}

export default function MediaPreview({mediaItem, isSelected, onSelect}:MediaPreview) {
    const imageUrl = mediaItem.image?.url;
    const stillFramMediaId = mediaItem.video?.stillFrameMediaId;
    const thumbnailUrl = mediaItem.thumbnail?.url
    const resolvedThumbnailUrl = stillFramMediaId && thumbnailUrl 
    ? thumbnailUrl.split(stillFramMediaId)[0] + stillFramMediaId
    : undefined

    if (!imageUrl && resolvedThumbnailUrl) return null;

    return <div className={cn('', isSelected && 'outline outline-1 outline-primary')}>
        <WixImg 
            mediaIdentifier={imageUrl || resolvedThumbnailUrl}
            alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
            width={100}
            height={100}
            onClick={onSelect}
            scaleToFill
        />
    </div>
}