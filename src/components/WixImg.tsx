/* eslint-disable @next/next/no-img-element */
import {media as wixMedia} from "@wix/sdk";
import {ImgHTMLAttributes} from "react";

type WixImgProps = Omit<
    ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height' | 'alt'
> & {
    mediaIdentifier: string|undefined;
    placeholder?: string;
    alt?: string|null|undefined;
} &(
    {
        scaleToFill: true;
        width: number;
        height: number;
    }|
    {
        scaleToFill: false;
    }
    )

export default function WixImg({ mediaIdentifier, placeholder= '/placeholder.png', alt, ...props }: WixImgProps) {
    const imageUrl = mediaIdentifier ?
        props.scaleToFill || props.scaleToFill === undefined
        ? wixMedia.getScaledToFillImageUrl(
            mediaIdentifier,
            props.width,
            props.height, {}
            ): wixMedia.getImageUrl(mediaIdentifier).url
        : placeholder;

    return <img alt={alt || ''} src={imageUrl} {...props} />;
}