import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Homepage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "mainHeading",
          title: "Main Heading",
          type: "string",
          initialValue: "The Chosen Bible Church",
        },
        {
          name: "subHeading",
          title: "Sub Heading",
          type: "text",
          rows: 2,
          initialValue: "A place where faith meets community, and hearts find purpose.",
        },
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "ctaButtons",
          title: "Call to Action Buttons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string", title: "Button Text" },
                { name: "link", type: "string", title: "Button Link" },
                { name: "style", type: "string", title: "Button Style", options: { list: ["primary", "secondary"] } },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "pastorWelcome",
      title: "Pastor's Welcome Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Welcome from Our Pastor",
        },
        {
          name: "pastorName",
          title: "Pastor's Name",
          type: "string",
          initialValue: "Pastor John Smith",
        },
        {
          name: "pastorImage",
          title: "Pastor's Photo",
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "welcomeMessage",
          title: "Welcome Message",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "signature",
          title: "Pastor's Signature Image",
          type: "image",
        },
      ],
    }),
    defineField({
      name: "upcomingEvents",
      title: "Upcoming Events Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Upcoming Events",
        },
        {
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
        },
        {
          name: "featuredEvents",
          title: "Featured Events",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "event" }],
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
        {
          name: "customEvents",
          title: "Custom Event Cards with Posters",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Event Title" },
                { name: "date", type: "datetime", title: "Event Date" },
                { name: "location", type: "string", title: "Location" },
                { name: "description", type: "text", title: "Description", rows: 3 },
                { 
                  name: "poster", 
                  type: "image", 
                  title: "Event Poster/Image",
                  options: { hotspot: true }
                },
                { name: "link", type: "string", title: "Event Link (optional)" },
              ],
            },
          ],
          validation: (Rule) => Rule.max(6),
        },
        {
          name: "viewAllLink",
          title: "View All Events Link",
          type: "string",
          initialValue: "/events",
        },
      ],
    }),
    defineField({
      name: "ministriesSection",
      title: "Ministries Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Our Ministries",
        },
        {
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
        },
        {
          name: "featuredMinistries",
          title: "Featured Ministries",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "ministry" }],
            },
          ],
          validation: (Rule) => Rule.max(4),
        },
      ],
    }),
    defineField({
      name: "recentSermons",
      title: "Recent Sermons Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Recent Sermons",
        },
        {
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
        },
        {
          name: "featuredSermons",
          title: "Featured Sermons",
          type: "array",
          of: [
            {
              type: "reference",
              to: [{ type: "sermon" }],
            },
          ],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "What People Say",
        },
        {
          name: "testimonialsList",
          title: "Testimonials",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", type: "string", title: "Person's Name" },
                { name: "role", type: "string", title: "Role/Title" },
                { name: "image", type: "image", title: "Person's Photo", options: { hotspot: true } },
                { name: "testimonial", type: "text", title: "Testimonial Text", rows: 4 },
                { name: "rating", type: "number", title: "Rating (1-5)", validation: (Rule) => Rule.min(1).max(5) },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "serviceTimesSection",
      title: "Service Times Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Service Times",
        },
        {
          name: "serviceTimes",
          title: "Service Times",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "day", type: "string", title: "Day of Week" },
                { name: "time", type: "string", title: "Time" },
                { name: "service", type: "string", title: "Service Name (optional)" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "contactSection",
      title: "Contact Section",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Visit Us",
        },
        {
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
        },
        {
          name: "serviceSchedule",
          title: "Service Schedule",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "day", type: "string", title: "Day" },
                { name: "time", type: "string", title: "Time" },
                { name: "service", type: "string", title: "Service Name" },
              ],
            },
          ],
        },
        {
          name: "quickActions",
          title: "Quick Action Buttons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "text", type: "string", title: "Button Text" },
                { name: "link", type: "string", title: "Button Link" },
                { name: "icon", type: "string", title: "Icon Name (Lucide)" },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || "Homepage Content",
      };
    },
  },
});
