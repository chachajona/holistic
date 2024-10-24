export interface Header {
    _id: string;
    heading: string;
    slug: { current: string };
    subheading?: string;
    image?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
}
