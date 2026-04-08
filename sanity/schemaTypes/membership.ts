import { defineType, defineField } from "sanity";

export default defineType({
  name: "membership",
  title: "Membership Application",
  type: "document",
  fields: [
    defineField({ name: "firstName", title: "First Name", type: "string" }),
    defineField({ name: "lastName", title: "Last Name", type: "string" }),
    defineField({ name: "preferredName", title: "Preferred Name", type: "string" }),
    defineField({ name: "dateOfBirth", title: "Date of Birth", type: "string" }),
    defineField({ name: "gender", title: "Gender", type: "string" }),
    defineField({ name: "maritalStatus", title: "Marital Status", type: "string" }),
    defineField({ name: "phoneNumber", title: "Phone Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "homeAddress", title: "Home Address", type: "string" }),
    defineField({ name: "memberSince", title: "Member Since", type: "string" }),
    defineField({ name: "heardAbout", title: "How did you hear about TCBC?", type: "string" }),
    defineField({ name: "acceptedJesus", title: "Accepted Jesus Christ", type: "boolean" }),
    defineField({ name: "baptizedWater", title: "Baptized in Water", type: "boolean" }),
    defineField({ name: "baptizedWaterYear", title: "Year of Water Baptism", type: "string" }),
    defineField({ name: "willingBaptism", title: "Willing to be Baptized", type: "string" }),
    defineField({ name: "baptizedHolySpirit", title: "Baptized in Holy Spirit", type: "boolean" }),
    defineField({ name: "baptizedHolySpiritYear", title: "Year of Holy Spirit Baptism", type: "string" }),
    defineField({ name: "willingHolySpirit", title: "Willing to receive Holy Spirit Baptism", type: "string" }),
    defineField({ name: "previousChurch", title: "Previous Church", type: "string" }),
    defineField({
      name: "ministryInterests",
      title: "Ministry Interests",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "willingServe", title: "Willing to Serve", type: "boolean" }),
    defineField({ name: "willingPrayers", title: "Support with Prayers & Attendance", type: "boolean" }),
    defineField({ name: "willingTithes", title: "Support with Tithes & Offerings", type: "boolean" }),
    defineField({ name: "agreeTeachings", title: "Agree to Church Teachings", type: "boolean" }),
    defineField({ name: "understandMembership", title: "Understand Membership Terms", type: "boolean" }),
    defineField({ name: "declarationAccepted", title: "Declaration Accepted", type: "boolean" }),
    defineField({ name: "signature", title: "Signature", type: "string" }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewed", value: "reviewed" },
          { title: "Approved", value: "approved" },
        ],
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "email",
    },
    prepare({ title, subtitle }) {
      return { title: title || "Unnamed", subtitle };
    },
  },
});
