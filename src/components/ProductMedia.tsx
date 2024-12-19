import { products } from "@wix/stores";
import WixImg from "./WixImg";
import { useState } from "react";
import MediaPreview from "./MediaPreview";
import Zoom from 'react-medium-image-zoom'

interface ProductMediaProps {
    media: products.MediaItem[];
}

export default function ProductMedia({media}: ProductMediaProps) {
    const [selectMedia, setSelectMedia] = useState(media?.[0])
    console.log(products.MediaItemType.video);
    
    if (!media.length) return null;

    const selectedImg = selectMedia?.image;
    const selectedVideo = selectMedia?.video?.files?.[0];
    return (
        <div className="basis-2/5 md:sticky md:top-0 h-fit space-y-5">
            <div className="sticky top-0">
                <div className="aspect-square bg-secondary">
                    {selectedImg?.url ? (
                        <Zoom key={selectedImg.url}>
                            <WixImg
                                scaleToFill
                                mediaIdentifier={selectedImg.url}
                                alt={selectedImg.altText}
                                width={1000}
                                height={1000}
                            />
                        </Zoom>
                    ) : selectedVideo?.url ? (
                        <div className="flex size-full items-center bg-black">
                            <video controls className="size-full">
                                <source
                                    src={selectedVideo.url}
                                    type={`video/${selectedVideo.format}`}
                                />
                            </video>
                        </div>
                    ) : null}
                </div>
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