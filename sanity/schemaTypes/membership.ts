import { defineType, defineField } from "sanity";

export default defineType({
  name: "membership",
  title: "Membership Application",
  type: "document",
  fields: [
    // Part I — Personal Information
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "preferredName", title: "Preferred Name", type: "string" }),
    defineField({ name: "homeAddress", title: "Home Address", type: "string" }),
    defineField({ name: "phoneNumber", title: "Phone Number", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "dateOfBirth", title: "Date of Birth", type: "string" }),
    defineField({ name: "maritalStatus", title: "Marital Status", type: "string" }),
    defineField({ name: "hasChildren", title: "Has Children", type: "boolean" }),
    defineField({ name: "childrenWorshippingAtTCBC", title: "Children Worshipping at TCBC", type: "boolean" }),
    defineField({ name: "childrenNames", title: "Children's Names", type: "string" }),
    defineField({ name: "occupation", title: "Occupation", type: "string" }),
    defineField({ name: "dateStartedAttending", title: "Date Started Attending TCBC", type: "string" }),

    // Part I — Church Background
    defineField({ name: "acceptedJesus", title: "Accepted Jesus Christ", type: "boolean" }),
    defineField({ name: "baptizedWater", title: "Baptized in Water", type: "boolean" }),
    defineField({ name: "willingBaptism", title: "Willing to be Baptized", type: "boolean" }),
    defineField({ name: "baptizedWaterYear", title: "Year of Water Baptism", type: "string" }),
    defineField({ name: "baptizedHolySpirit", title: "Baptized in Holy Spirit", type: "boolean" }),
    defineField({ name: "willingHolySpirit", title: "Willing to Receive Holy Spirit Teaching", type: "boolean" }),
    defineField({ name: "baptizedHolySpiritYear", title: "Year of Holy Spirit Baptism", type: "string" }),
    defineField({ name: "previouslyMemberOfChurch", title: "Previously Member of Another Church", type: "boolean" }),
    defineField({ name: "previousChurchName", title: "Previous Church Name", type: "string" }),
    defineField({ name: "currentlyMemberOfChurch", title: "Currently Member of Another Church", type: "boolean" }),
    defineField({ name: "currentChurchDetails", title: "Current Church Details", type: "string" }),
    defineField({ name: "heardAbout", title: "How did you hear about TCBC?", type: "string" }),

    // Part I — Ministry Interests
    defineField({ name: "ministryInterests", title: "Ministry Interests", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ministryOther", title: "Other Ministry Interest", type: "string" }),

    // Part I — Declaration
    defineField({ name: "partISignature", title: "Part I Signature", type: "string" }),
    defineField({ name: "partIDate", title: "Part I Date", type: "string" }),

    // Part II — Membership Confirmation
    defineField({ name: "membershipClassCompleted", title: "Membership Classes Completed", type: "boolean" }),
    defineField({ name: "membershipClassDate", title: "Membership Class Date", type: "string" }),
    defineField({ name: "commitClasses", title: "Commit: Completed Classes", type: "boolean" }),
    defineField({ name: "commitMission", title: "Commit: Support Mission/Values", type: "boolean" }),
    defineField({ name: "commitConstitution", title: "Commit: Uphold Constitution", type: "boolean" }),
    defineField({ name: "commitPeace", title: "Commit: Peace and Unity", type: "boolean" }),
    defineField({ name: "commitLeadership", title: "Commit: Leadership Processes", type: "boolean" }),
    defineField({ name: "willingServe", title: "Willing to Serve", type: "boolean" }),
    defineField({ name: "willingPrayers", title: "Support with Prayers & Attendance", type: "boolean" }),
    defineField({ name: "willingTithes", title: "Support with Tithes & Offerings", type: "boolean" }),
    defineField({ name: "agreeTeachings", title: "Agree to Church Teachings", type: "boolean" }),

    // Part II — Declaration
    defineField({ name: "partIISignature", title: "Part II Signature", type: "string" }),
    defineField({ name: "partIIDate", title: "Part II Date", type: "string" }),

    // Meta
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Deferred", value: "deferred" },
        ],
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "email" },
  },
});
