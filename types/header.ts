import { Image, Reference } from "sanity";

export interface Header {
    _type: "header";
    heading: string;
    subtitle?: string;
    backgroundImage: Image;
    page: Reference;
}
