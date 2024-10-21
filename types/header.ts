import { Image } from "sanity";

export interface Header {
    _id: string;
    heading: string;
    slug: { current: string };
    subtitle?: string;
    backgroundImage: Image;
}
