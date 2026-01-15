import { defineField, defineType } from "sanity";

export default defineType({
  name: "organization",
  title: "Organization Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Organization Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Organization Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Physical Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "hours",
      title: "Service Hours",
      type: "array",
      of: [
        {
          type: "object",
          name: "serviceHour",
          fields: [
            { name: "day", type: "string", title: "Day" },
            { name: "time", type: "string", title: "Time" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", type: "string", title: "Platform (Facebook, Instagram, etc)" },
            { name: "url", type: "string", title: "URL" },
          ],
        },
      ],
    }),
    defineField({
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "vision",
      title: "Vision Statement",
      type: "text",
      rows: 4,
    }),
  ],
});
