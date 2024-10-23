import { defineField, defineType } from "sanity";

export const contactType = defineType({
    name: "contactSubmission",
    title: "Contact Submission",
    type: "document",
    fields: [
        defineField({
            name: "phoneNumber",
            title: "Phone Number",
            type: "string",
        }),
        defineField({
            name: "submittedAt",
            title: "Submitted At",
            type: "datetime",
        }),
    ],
});
