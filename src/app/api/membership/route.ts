import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { createClient } from "next-sanity";
import { sendEmail } from "@/lib/email";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const sanityClient =
  projectId && dataset && token
    ? createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false })
    : null;

interface MembershipFormData {
  fullName: string;
  preferredName: string;
  homeAddress: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  maritalStatus: string;
  hasChildren: boolean;
  childrenWorshippingAtTCBC: boolean;
  childrenNames: string;
  occupation: string;
  dateStartedAttending: string;
  acceptedJesus: boolean;
  baptizedWater: boolean;
  willingBaptism: boolean;
  baptizedWaterYear: string;
  baptizedHolySpirit: boolean;
  willingHolySpirit: boolean;
  baptizedHolySpiritYear: string;
  previouslyMemberOfChurch: boolean;
  previousChurchName: string;
  currentlyMemberOfChurch: boolean;
  currentChurchDetails: string;
  heardAbout: string;
  ministryInterests: string[];
  ministryOther: string;
  partISignature: string;
  partIDate: string;
  membershipClassCompleted: boolean;
  membershipClassDate: string;
  commitClasses: boolean;
  commitMission: boolean;
  commitConstitution: boolean;
  commitPeace: boolean;
  commitLeadership: boolean;
  willingServe: boolean;
  willingPrayers: boolean;
  willingTithes: boolean;
  agreeTeachings: boolean;
  partIISignature: string;
  partIIDate: string;
}

function yn(val: boolean | null | undefined): string {
  if (val === true) return "Yes";
  if (val === false) return "No";
  return "N/A";
}

function generatePDF(d: MembershipFormData): Uint8Array {
  const doc = new jsPDF();
  let y = 15;
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 12;
  const cw = pw - m * 2;

  const checkPage = (need: number) => {
    if (y > ph - need) { doc.addPage(); y = 15; }
  };

  const title = (text: string) => {
    checkPage(40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(text, pw / 2, y, { align: "center" });
    y += 7;
    doc.setDrawColor(72, 0, 126);
    doc.line(m, y, pw - m, y);
    y += 8;
  };

  const section = (text: string) => {
    checkPage(30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(72, 0, 126);
    doc.text(text, m, y);
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(m, y, pw - m, y);
    y += 5;
    doc.setTextColor(0, 0, 0);
  };

  const field = (label: string, value: string) => {
    checkPage(16);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    const labelLines = doc.splitTextToSize(`${label}:`, cw);
    doc.text(labelLines, m, y);
    y += labelLines.length * 4.5;
    doc.setFont("helvetica", "normal");
    const valLines = doc.splitTextToSize(value || "N/A", cw);
    doc.text(valLines, m, y);
    y += valLines.length * 4.5 + 3;
  };

  const field2 = (l1: string, v1: string, l2: string, v2: string) => {
    checkPage(20);
    const col = (cw - 10) / 2;
    const col2X = m + col + 10;

    // Column 1
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    const lab1 = doc.splitTextToSize(`${l1}:`, col);
    doc.text(lab1, m, y);
    const startY = y;
    let y1 = y + lab1.length * 4.5;
    doc.setFont("helvetica", "normal");
    const val1 = doc.splitTextToSize(v1 || "N/A", col);
    doc.text(val1, m, y1);
    y1 += val1.length * 4.5;

    // Column 2
    doc.setFont("helvetica", "bold");
    const lab2 = doc.splitTextToSize(`${l2}:`, col);
    doc.text(lab2, col2X, startY);
    let y2 = startY + lab2.length * 4.5;
    doc.setFont("helvetica", "normal");
    const val2 = doc.splitTextToSize(v2 || "N/A", col);
    doc.text(val2, col2X, y2);
    y2 += val2.length * 4.5;

    y = Math.max(y1, y2) + 3;
  };

  // ─── HEADER ───
  title("TCBC Membership Application Form");
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("Two-Stage Membership Process", pw / 2, y, { align: "center" });
  y += 8;

  // ─── PART I ───
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(72, 0, 126);
  doc.text("PART I - INITIAL MEMBERSHIP APPLICATION", m, y);
  doc.setTextColor(0, 0, 0);
  y += 8;

  section("A. Personal Information");
  field("Full Name", d.fullName);
  field("Preferred Name", d.preferredName);
  field("Home Address", d.homeAddress);
  field2("Phone Number", d.phoneNumber, "Email Address", d.email);
  field2("Date of Birth", d.dateOfBirth, "Marital Status", d.maritalStatus);
  field("Do you have children?", yn(d.hasChildren));
  if (d.hasChildren) {
    field("Will they worship at TCBC?", yn(d.childrenWorshippingAtTCBC));
    if (d.childrenNames) field("Children's Names", d.childrenNames);
  }
  field2("Occupation", d.occupation, "Date Started Attending TCBC", d.dateStartedAttending || "N/A");

  y += 3;
  section("B. Church Background");
  field("1. Accepted Jesus Christ as Lord and Saviour", yn(d.acceptedJesus));
  field("2. Baptized by immersion after salvation", yn(d.baptizedWater));
  if (d.baptizedWater === false) field("   Willing to be baptized at earliest opportunity", yn(d.willingBaptism));
  if (d.baptizedWater === true) field("   Estimated year of baptism", d.baptizedWaterYear);
  field("3. Received the baptism of the Holy Spirit", yn(d.baptizedHolySpirit));
  if (d.baptizedHolySpirit === false) field("   Willing to receive teaching/guidance", yn(d.willingHolySpirit));
  if (d.baptizedHolySpirit === true) field("   Approximate year", d.baptizedHolySpiritYear);
  field("4. Previously a member of another church", yn(d.previouslyMemberOfChurch));
  if (d.previouslyMemberOfChurch) field("   Church name", d.previousChurchName);
  field("5. Currently a member of another church", yn(d.currentlyMemberOfChurch));
  if (d.currentlyMemberOfChurch) field("   Details", d.currentChurchDetails);
  field("6. How did you hear about TCBC?", d.heardAbout);

  y += 3;
  section("C. Ministry Interests");
  field("Selected Ministries", d.ministryInterests.length > 0 ? d.ministryInterests.join(", ") : "None selected");
  if (d.ministryOther) field("Other", d.ministryOther);

  y += 3;
  section("D. Applicant Declaration - Part I");
  field2("Applicant Signature", d.partISignature, "Date", d.partIDate);

  // ─── PART II ───
  const partIIFilled = d.partIISignature || d.membershipClassCompleted;

  if (partIIFilled) {
    y += 5;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(72, 0, 126);
    checkPage(20);
    doc.text("PART II - MEMBERSHIP CONFIRMATION", m, y);
    doc.setTextColor(0, 0, 0);
    y += 8;

    section("A. Membership Class Completion");
    field("Completed TCBC membership classes", yn(d.membershipClassCompleted));
    if (d.membershipClassCompleted) field("Date completed", d.membershipClassDate);

    y += 3;
    section("B. Membership Commitment");
    field("Completed required membership classes", yn(d.commitClasses));
    field("Understand and support TCBC mission/values", yn(d.commitMission));
    field("Agree to uphold constitution and leadership", yn(d.commitConstitution));
    field("Seek to live in peace, unity, and fellowship", yn(d.commitPeace));
    field("Understand membership concerns handled per constitution", yn(d.commitLeadership));
    field("Willing to serve in the church", yn(d.willingServe));
    field("Support with prayers and regular attendance", yn(d.willingPrayers));
    field("Support with tithes and offerings", yn(d.willingTithes));
    field("Agree to uphold teachings, values, and constitution", yn(d.agreeTeachings));

    y += 3;
    section("C. Final Declaration - Part II");
    field2("Applicant Signature", d.partIISignature, "Date", d.partIIDate);
  } else {
    y += 5;
    checkPage(15);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(120, 120, 120);
    doc.text("Part II — To be completed after TCBC membership classes.", m, y);
    doc.setTextColor(0, 0, 0);
    y += 8;
  }

  // ─── CHURCH USE ONLY ───
  y += 5;
  checkPage(100);
  section("FOR CHURCH USE ONLY");

  const tableRows: [string, string][] = [
    ["Date Part I Received:", new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
    ["Membership Classes Completed:", "[ ] Yes    [ ] No"],
    ["Date Membership Classes Completed:", "_______________________"],
    ["Membership Status:", "[ ] Pending    [ ] Approved    [ ] Deferred"],
    ["Effective Date of Membership:", "_______________________"],
    ["Recommended By:", "_______________________"],
    ["Approved By (Church Leader):", "_______________________"],
  ];

  const rowH = 10;
  const colLeft = cw * 0.48;
  const colRight = cw - colLeft;

  for (let i = 0; i < tableRows.length; i++) {
    checkPage(rowH + 2);
    const rowY = y;

    // Alternating row background
    if (i % 2 === 0) {
      doc.setFillColor(220, 232, 248);
      doc.rect(m, rowY - 3, cw, rowH, "F");
    }

    // Borders
    doc.setDrawColor(180, 180, 180);
    doc.rect(m, rowY - 3, cw, rowH);
    doc.line(m + colLeft, rowY - 3, m + colLeft, rowY - 3 + rowH);

    // Label
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(tableRows[i][0], m + 3, rowY + 2.5);

    // Value
    doc.setFont("helvetica", "normal");
    doc.text(tableRows[i][1], m + colLeft + 3, rowY + 2.5);

    y = rowY + rowH;
  }

  y += 8;
  checkPage(30);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Signature: _______________________________", m, y);
  y += 7;
  doc.text("Date: ___________________", m, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text("Notes:", m, y);
  y += 7;
  doc.line(m, y, pw - m, y);
  y += 8;
  doc.line(m, y, pw - m, y);

  return new Uint8Array(Buffer.from(doc.output("arraybuffer")));
}

export async function POST(request: NextRequest) {
  try {
    const formData: MembershipFormData = await request.json();

    // Save to Sanity
    if (sanityClient) {
      try {
        await sanityClient.create({
          _type: "membership",
          ...formData,
          submittedAt: new Date().toISOString(),
          status: "new",
        });
      } catch (err) {
        console.error("Failed to save membership to Sanity:", err);
      }
    }

    // Generate PDF
    const pdfBuffer = generatePDF(formData);
    const filename = `TCBC_Membership_${formData.fullName.replace(/\s+/g, "_")}.pdf`;

    // Send email
    await sendEmail({
      subject: `New Membership Application — ${formData.fullName}`,
      html: `
        <h2>New Membership Application</h2>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
        <p>Please see the attached PDF for full details.</p>
      `,
      attachments: [{ filename, content: Buffer.from(pdfBuffer), contentType: "application/pdf" }],
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error processing membership form:", error);
    return NextResponse.json({ error: "Failed to process form" }, { status: 500 });
  }
}
