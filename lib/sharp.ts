import sharp from "sharp";
import { encode } from "blurhash";

interface ImageProcessingResult {
    webP: Buffer;
    blurHash: {
        hash: string;
        width: number;
        height: number;
    };
}

const MAX_DIMENSION = 16383;

async function processImage(
    imageBuffer: Buffer,
): Promise<ImageProcessingResult> {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
        throw new Error("Invalid image metadata");
    }

    // Resize image if necessary
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
        const aspectRatio = metadata.width / metadata.height;
        const newWidth = Math.min(metadata.width, MAX_DIMENSION);
        const newHeight = Math.round(newWidth / aspectRatio);

        image.resize(newWidth, newHeight);
    }

    // Generate WebP
    const webP = await image.webp().toBuffer();

    // Generate BlurHash
    const { data, info } = await image
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
    const blurHash = encode(
        new Uint8ClampedArray(data),
        info.width,
        info.height,
        4,
        4,
    );

    return {
        webP,
        blurHash: {
            hash: blurHash,
            width: info.width,
            height: info.height,
        },
    };
}

export async function optimizeImage(
    imageBuffer: Buffer,
): Promise<ImageProcessingResult> {
    try {
        return await processImage(imageBuffer);
    } catch (error) {
        console.error("Error processing image:", error);
        throw error;
    }
}
