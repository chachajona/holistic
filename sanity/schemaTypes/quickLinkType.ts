import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const quickLinkType = defineType({
    name: "quickLink",
    type: "object",
    title: "Quick Link",
    fields: [
        defineField({
            name: "title",
            type: "localeString",
            title: "Title",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "link",
            type: "string",
            title: "Link URL",
            description:
                "Internal path this card links to (e.g., /services, /treatments)",
            validation: Rule =>
                Rule.required().custom(value => {
                    if (!value) return true;
                    const isValidPath = /^\/[a-z0-9\-\/]*$/i.test(value);
                    return isValidPath
                        ? true
                        : "Must be a valid internal path starting with /";
                }),
        }),
        defineField({
            name: "bgImage",
            type: "image",
            title: "Background Image",
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "iconType",
            type: "string",
            title: "Icon Type",
            options: {
                list: [
                    { title: "Service Icon", value: "service" },
                    { title: "Treatment Icon", value: "treatment" },
                    { title: "Team Icon", value: "team" },
                ],
                layout: "radio",
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "disableScroll",
            type: "boolean",
            title: "Disable Scroll",
            description:
                "If enabled, clicking this link will not scroll to the top of the page",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            titleObj: "title",
            link: "link",
            media: "bgImage",
        },
        prepare({ titleObj, link, media }) {
            // Extract Vietnamese text from localeString for preview
            const title = titleObj?.vi || titleObj || "Untitled Link";
            return {
                title,
                subtitle: link || "No link set",
                media: media || LinkIcon,
            };
        },
    },
});
