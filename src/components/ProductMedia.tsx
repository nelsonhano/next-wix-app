import { products } from "@wix/stores";
import WixImg from "./WixImg";
import { useState } from "react";
import MediaPreview from "./MediaPreview";

interface ProductMediaProps {
    media: products.MediaItem[];
}

export default function ProductMedia({media}: ProductMediaProps) {
    const [selectMedia, setSelectMedia] = useState(media?.[0])

    if (!media.length) return null;

    const selectedImg = selectMedia?.image;
    const selectedVideo = selectMedia?.video?.files?.[0];
    return (
        <div className="basis-2/5">
            <div className="aspect-square bg-secondary">
                {selectedImg?.url ? 
                (
                    <WixImg
                        scaleToFill
                        mediaIdentifier={selectedImg.url}
                        alt={selectedImg.altText}
                        width={1000}
                        height={1000} 
                    />

                ): selectedVideo?.url ?(
                    <div className="flex size-full items-center bg-black">
                            <video controls className="size-full">
                                <source 
                                 src={selectedVideo.url}
                                 type={`video/${selectedVideo.format}`}
                                />
                            </video>
                    </div>
                ):null}
            </div>
            {media.length > 1 && (
                <div className="flex flex-wrap gap-5">
                    {media.map(mediaItem => (
                        <MediaPreview
                            key={mediaItem._id}
                            mediaItem={mediaItem}
                            isSelected={mediaItem._id === selectMedia._id}
                            onSelect={() => setSelectMedia(mediaItem)}
                        />
                    ))}
                </div>
            )}
        </div>
    )   
}