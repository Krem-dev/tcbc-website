import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "organization", title: "Organization", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Replied", value: "replied" },
        ],
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
});
