import { defineField, defineType } from "sanity";

export const treatmentBenefit = defineType({
  name: "treatmentBenefit",
  title: "Treatment Benefit",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Benefit ID",
      type: "slug",
      options: {
        source: "title",
        disableArrayWarning: true,
      },
    }),
    defineField({
      name: "title",
      title: "Benefit Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Benefit Description",
      type: "localeText",
    }),
  ],
  preview: {
    select: {
      title: "title.vi",
      subtitle: "title.en",
    },
  },
});
