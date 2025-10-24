import { type SchemaTypeDefinition } from "sanity";

import { ctaType } from "./ctaType";
import { faqType } from "./faqType";
import { formType } from "./formType";
import { headerType } from "./headerType";
import { heroType } from "./heroType";
import { localeBlock, localeString, localeText } from "./localeTypes";
import { pageType } from "./pageType";
import { problemCategoryType } from "./problemCategoryType";
import { quickLinkType } from "./quickLinkType";
import { seoType } from "./seo";
import { serviceType } from "./serviceType";
import { siteSettingsType } from "./siteSettings";
import { testimonialType } from "./testimonialType";
import { treatmentType } from "./treatmentType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Locale types for internationalization
        localeString,
        localeText,
        localeBlock,
        // Schema types
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
        serviceType,
        treatmentType,
        problemCategoryType,
    ],
};
