import { type SchemaTypeDefinition } from "sanity";

// Document types
import { ctaType } from "./ctaType";
import { faqType } from "./faqType";
import { formType } from "./formType";
import { headerType } from "./headerType";
import { heroType } from "./heroType";
// Locale types for internationalization
import { localeBlock, localeString, localeText } from "./localeTypes";
// Reusable object types (must be registered before documents that use them)
import {
    sanityImage,
    treatmentBenefit,
    treatmentBooking,
    treatmentProtocol,
} from "./objects";
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
        // Reusable object types (must be before documents)
        sanityImage,
        treatmentBenefit,
        treatmentProtocol,
        treatmentBooking,
        // Document types
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
