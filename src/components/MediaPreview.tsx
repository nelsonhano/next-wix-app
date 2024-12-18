import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import WixImg from "./WixImg";
import { PlayIcon } from "lucide-react";

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

    if (!imageUrl && !resolvedThumbnailUrl) return null;

    return <div className={cn('relative cursor-pointer bg-secondary', isSelected && 'outline outline-1 outline-primary')}>
        <WixImg 
            mediaIdentifier={imageUrl || resolvedThumbnailUrl}
            alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
            width={100}
            height={100}
            onClick={onSelect}
            scaleToFill
        />
        {resolvedThumbnailUrl && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 rounded-full size-9s flex items-center justify-center">
                <PlayIcon className="size-5 text-white/50" />
            </span>
        )}
    </div>
}