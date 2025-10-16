import { type SchemaTypeDefinition } from "sanity";

import { contactType } from "./contactType";
import { ctaType } from "./ctaType";
import { faqType } from "./faqType";
import { formType } from "./formType";
import { headerType } from "./headerType";
import { heroType } from "./heroType";
import { pageType } from "./pageType";
import { problemCategoryType } from "./problemCategoryType";
import { quickLinkType } from "./quickLinkType";
import { serviceType } from "./serviceType";
import { testimonialType } from "./testimonialType";
import { treatmentType } from "./treatmentType";
import { seoType } from "./seo";
import { siteSettingsType } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        seoType,
        siteSettingsType,
        pageType,
        testimonialType,
        headerType,
        heroType,
        ctaType,
        quickLinkType,
        faqType,
        formType,
        contactType,
        serviceType,
        treatmentType,
        problemCategoryType,
    ],
};
