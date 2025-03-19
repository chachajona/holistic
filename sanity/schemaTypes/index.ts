import { type SchemaTypeDefinition } from "sanity";

import { contactType } from "./contactType";
import { faqType } from "./faqType";
import { formType } from "./formType";
import { headerType } from "./headerType";
import { pageType } from "./pageType";
import { serviceType } from "./serviceType";
import { testimonialType } from "./testimonialType";
import { treatmentType } from "./treatmentType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        pageType,
        testimonialType,
        headerType,
        faqType,
        formType,
        contactType,
        serviceType,
        treatmentType,
    ],
};
