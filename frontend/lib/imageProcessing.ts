import { optimizeImage } from "./sharp";

export async function getOptimizedImageData(imageUrl: string) {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const optimizedImage = await optimizeImage(buffer);

    return {
        webPDataUrl: `data:image/webp;base64,${optimizedImage.webP.toString("base64")}`,
        blurHash: optimizedImage.blurHash.hash,
        width: optimizedImage.blurHash.width,
        height: optimizedImage.blurHash.height,
    };
}
