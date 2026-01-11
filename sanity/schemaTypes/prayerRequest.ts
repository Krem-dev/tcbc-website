import { defineField, defineType } from "sanity";

export default defineType({
  name: "prayerRequest",
  title: "Prayer Requests",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Personal", value: "Personal" },
          { title: "Family & Relationships", value: "Family & Relationships" },
          { title: "Health & Healing", value: "Health & Healing" },
          { title: "Thanksgiving & Praise", value: "Thanksgiving & Praise" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "request",
      title: "Prayer Request",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isConfidential",
      title: "Keep Confidential",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Prayer", value: "in-prayer" },
          { title: "Answered", value: "answered" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      category: "category",
      date: "submittedAt",
    },
    prepare(selection) {
      const { name, category, date } = selection;
      return {
        title: name,
        subtitle: `${category} - ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
