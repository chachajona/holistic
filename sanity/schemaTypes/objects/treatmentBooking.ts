import { defineField, defineType } from "sanity";

export const treatmentBooking = defineType({
    name: "treatmentBooking",
    title: "Booking Option",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Booking Title",
            type: "localeString",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: "duration",
            title: "Duration",
            type: "string",
            validation: Rule => Rule.required(),
            description: 'e.g., "60 phút", "90 minutes"',
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "localeText",
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title.vi",
            price: "price",
            duration: "duration",
        },
        prepare({ title, price, duration }) {
            return {
                title: title || "Untitled",
                subtitle: `${price.toLocaleString()} VND • ${duration}`,
            };
        },
    },
});
