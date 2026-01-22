import { defineField, defineType } from "sanity";

export default defineType({
  name: "sermon",
  title: "Sermons",
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
      name: "speaker",
      title: "Speaker",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      description: "Custom thumbnail for the sermon. If not provided, a default image will be used.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      speaker: "speaker",
      date: "date",
    },
    prepare(selection) {
      const { title, speaker, date } = selection;
      return {
        title,
        subtitle: `by ${speaker} on ${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
