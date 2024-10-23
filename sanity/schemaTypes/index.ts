import { type SchemaTypeDefinition } from "sanity";

import { contactType } from "./contactType";
import { faqType } from "./faqType";
import { formType } from "./formType";
import { headerType } from "./headerType";
import { pageType } from "./pageType";
import { testimonialType } from "./testimonialType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        pageType,
        testimonialType,
        headerType,
        faqType,
        formType,
        contactType,
    ],
};
