import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
    name: "siteSettings",
    type: "document",
    title: "Site Settings",
    fields: [
        defineField({
            name: "siteUrl",
            type: "url",
            title: "Site URL",
            description: "Base URL used for canonical links and OG URLs",
            validation: Rule =>
                Rule.required().uri({
                    scheme: ["http", "https"],
                }),
        }),
        defineField({
            name: "defaultSeo",
            type: "seo",
            title: "Default SEO",
            description:
                "Fallback SEO used when a document doesn't specify its own.",
        }),
        defineField({
            name: "contactInfo",
            type: "object",
            title: "Contact Information",
            description: "Contact details displayed in header and footer",
            fields: [
                defineField({
                    name: "phone",
                    type: "string",
                    title: "Phone Number",
                    description: "Primary hotline number",
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: "email",
                    type: "string",
                    title: "Email Address",
                    validation: Rule => Rule.required().email(),
                }),
                defineField({
                    name: "locations",
                    type: "array",
                    title: "Locations",
                    description: "Business locations/branches",
                    validation: Rule =>
                        Rule.required()
                            .min(1)
                            .custom(locations => {
                                if (!locations) return true;
                                if (!Array.isArray(locations)) return true;
                                const primaryCount = (
                                    locations as Array<{ isPrimary?: boolean }>
                                ).filter(loc => loc?.isPrimary === true).length;
                                return primaryCount <= 1
                                    ? true
                                    : "Only one location can be marked as primary.";
                            }),
                    of: [
                        {
                            type: "object",
                            fields: [
                                defineField({
                                    name: "name",
                                    type: "string",
                                    title: "Location Name",
                                    description: "e.g., CN1, CN2, Headquarters",
                                }),
                                defineField({
                                    name: "address",
                                    type: "string",
                                    title: "Address",
                                    validation: Rule => Rule.required(),
                                }),
                                defineField({
                                    name: "mapUrl",
                                    type: "url",
                                    title: "Google Maps URL",
                                    description:
                                        "Link to location on Google Maps",
                                    validation: Rule =>
                                        Rule.uri({
                                            scheme: ["http", "https"],
                                        }),
                                }),
                                defineField({
                                    name: "isPrimary",
                                    type: "boolean",
                                    title: "Primary Location",
                                    description:
                                        "Show this location in the top banner",
                                    initialValue: false,
                                }),
                            ],
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: "socialMedia",
            type: "object",
            title: "Social Media",
            description: "Social media links",
            fields: [
                defineField({
                    name: "facebook",
                    type: "url",
                    title: "Facebook URL",
                    validation: Rule =>
                        Rule.uri({
                            scheme: ["http", "https"],
                        }),
                }),
                defineField({
                    name: "instagram",
                    type: "url",
                    title: "Instagram URL",
                    validation: Rule =>
                        Rule.uri({
                            scheme: ["http", "https"],
                        }),
                }),
            ],
        }),
    ],
});
