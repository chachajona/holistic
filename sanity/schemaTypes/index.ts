import { type SchemaTypeDefinition } from "sanity";

import { headerType } from "./headerType";
import { pageType } from "./pageType";
import { postType } from "./postType";
import { testimonialType } from "./testimonialType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [pageType, postType, testimonialType, headerType],
};
