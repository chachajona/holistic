import { defineField, defineType } from "sanity";

export const sanityImage = defineType({
  name: "sanityImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Important for SEO and accessibility",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
  },
});
