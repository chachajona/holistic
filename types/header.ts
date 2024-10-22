export interface Header {
    _id: string;
    heading: string;
    slug: { current: string };
    subtitle?: string;
    image?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
}
