import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Events",
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
    }),
    defineField({
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Worship", value: "worship" },
          { title: "Community", value: "community" },
          { title: "Youth", value: "youth" },
          { title: "Women", value: "women" },
          { title: "Men", value: "men" },
          { title: "Children", value: "children" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "ministry",
      title: "Ministry",
      type: "reference",
      to: [{ type: "ministry" }],
      description: "Select which ministry this event is associated with",
    }),
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Event",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "startDate",
      location: "location",
    },
    prepare(selection) {
      const { title, date, location } = selection;
      return {
        title,
        subtitle: `${new Date(date).toLocaleDateString()} at ${location}`,
      };
    },
  },
});
