import { defineField, defineType } from "sanity";

export default defineType({
  name: "ministry",
  title: "Ministries",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      description: "Key points about this ministry",
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Get Involved",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Link",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (e.g., Heart, Users, Smile, Baby, Lightbulb, MessageSquare)",
      options: {
        list: [
          { title: "Heart", value: "Heart" },
          { title: "Users", value: "Users" },
          { title: "Smile", value: "Smile" },
          { title: "Baby", value: "Baby" },
          { title: "Lightbulb", value: "Lightbulb" },
          { title: "MessageSquare", value: "MessageSquare" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which ministries appear (1-6)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
    },
    prepare(selection) {
      const { title, order } = selection;
      return {
        title,
        subtitle: `Order: ${order}`,
      };
    },
  },
});
