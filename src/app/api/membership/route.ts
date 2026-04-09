import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { createClient } from "next-sanity";
import { sendEmail } from "@/lib/email";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const sanityClient =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        token,
        useCdn: false,
      })
    : null;

interface MembershipFormData {
  firstName: string;
  lastName: string;
  preferredName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  memberSince: string;
  heardAbout: string;
  acceptedJesus: boolean;
  baptizedWater: boolean;
  baptizedWaterYear: string;
  willingBaptism: string;
  baptizedHolySpirit: boolean;
  baptizedHolySpiritYear: string;
  willingHolySpirit: string;
  previousChurch: string;
  ministryInterests: string[];
  willingServe: boolean;
  willingPrayers: boolean;
  willingTithes: boolean;
  agreeTeachings: boolean;
  understandMembership: boolean;
  declarationAccepted: boolean;
  signature: string;
  date: string;
}

function generatePDF(data: MembershipFormData): Uint8Array {
  const doc = new jsPDF();
  let yPosition = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;

  const addTitle = (title: string) => {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 15;
    }
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8;
    doc.setDrawColor(72, 0, 126);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
  };

  const addSectionHeader = (title: string) => {
    if (yPosition > pageHeight - 35) {
      doc.addPage();
      yPosition = 15;
    }
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(72, 0, 126);
    doc.text(title, margin, yPosition);
    yPosition += 6;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
    doc.setTextColor(0, 0, 0);
  };

  const addField = (label: string, value: string) => {
    if (yPosition > pageHeight - 12) {
      doc.addPage();
      yPosition = 15;
    }
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, margin, yPosition);
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(value, contentWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 4.5 + 2;
  };

  const addTwoColumnFields = (label1: string, value1: string, label2: string, value2: string) => {
    if (yPosition > pageHeight - 15) {
      doc.addPage();
      yPosition = 15;
    }
    const colWidth = (contentWidth - 4) / 2;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`${label1}:`, margin, yPosition);
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    const lines1 = doc.splitTextToSize(value1, colWidth);
    doc.text(lines1, margin, yPosition);
    
    const maxHeight1 = lines1.length * 4.5;
    
    doc.setFont("helvetica", "bold");
    doc.text(`${label2}:`, margin + colWidth + 2, yPosition - 5);
    doc.setFont("helvetica", "normal");
    const lines2 = doc.splitTextToSize(value2, colWidth);
    doc.text(lines2, margin + colWidth + 2, yPosition);
    
    const maxHeight2 = lines2.length * 4.5;
    yPosition += Math.max(maxHeight1, maxHeight2) + 3;
  };

  addTitle("TCBC Membership Application");

  addSectionHeader("Personal Information");
  addTwoColumnFields("First Name", data.firstName, "Last Name", data.lastName);
  addField("Preferred Name", data.preferredName);
  addTwoColumnFields("Date of Birth", data.dateOfBirth, "Gender", data.gender);
  addTwoColumnFields("Marital Status", data.maritalStatus, "Phone Number", data.phoneNumber);
  addField("Email Address", data.email);
  addField("Home Address", data.homeAddress);

  yPosition += 3;
  addSectionHeader("Church Information");
  addTwoColumnFields("Member Since", data.memberSince || "N/A", "How did you hear about TCBC", data.heardAbout);
  addField("Accepted Jesus Christ as Lord and Savior", data.acceptedJesus ? "Yes" : "No");
  addField("Baptized in Water by Immersion", data.baptizedWater ? "Yes" : "No");
  if (data.baptizedWater) {
    addField("Year of Baptism", data.baptizedWaterYear);
  } else {
    addField("Willing to be Baptized at earliest opportunity", data.willingBaptism);
  }
  addField("Baptized in Holy Spirit with evidence of speaking in tongues", data.baptizedHolySpirit ? "Yes" : "No");
  if (data.baptizedHolySpirit) {
    addField("Year of Holy Spirit Baptism", data.baptizedHolySpiritYear);
  } else {
    addField("Willing to receive baptism of Holy Spirit", data.willingHolySpirit);
  }
  addField("Previous Church", data.previousChurch || "N/A");

  yPosition += 3;
  addSectionHeader("Ministry Interests");
  addField("Selected Ministries", data.ministryInterests.length > 0 ? data.ministryInterests.join(", ") : "None selected");

  yPosition += 3;
  addSectionHeader("Availability and Commitment");
  addField("Willing to serve in the church", data.willingServe ? "Yes" : "No");
  addField("Support with faithful prayers and attendance", data.willingPrayers ? "Yes" : "No");
  addField("Support with tithes and offerings", data.willingTithes ? "Yes" : "No");
  addField("Agree to uphold Church teachings and constitution", data.agreeTeachings ? "Yes" : "No");
  addField("Understand membership terms and conditions", data.understandMembership ? "Yes" : "No");

  yPosition += 3;
  addSectionHeader("Declaration and Signature");
  addField("Declaration Accepted", data.declarationAccepted ? "Yes" : "No");
  addTwoColumnFields("Signature", data.signature, "Date", new Date(data.date).toLocaleDateString());

  yPosition += 5;
  addSectionHeader("FOR OFFICE USE ONLY");
  addField("Membership Orientation Completed", "[ ] Yes  [ ] No");
  addField("Date Received", "_______________________");
  addField("Church Leader's Signature", "_______________________");

  return new Uint8Array(Buffer.from(doc.output("arraybuffer")));
}

export async function POST(request: NextRequest) {
  try {
    const formData: MembershipFormData = await request.json();

    // Save to Sanity CMS
    if (sanityClient) {
      try {
        await sanityClient.create({
          _type: "membership",
          firstName: formData.firstName,
          lastName: formData.lastName,
          preferredName: formData.preferredName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          maritalStatus: formData.maritalStatus,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          homeAddress: formData.homeAddress,
          memberSince: formData.memberSince,
          heardAbout: formData.heardAbout,
          acceptedJesus: formData.acceptedJesus,
          baptizedWater: formData.baptizedWater,
          baptizedWaterYear: formData.baptizedWaterYear,
          willingBaptism: formData.willingBaptism,
          baptizedHolySpirit: formData.baptizedHolySpirit,
          baptizedHolySpiritYear: formData.baptizedHolySpiritYear,
          willingHolySpirit: formData.willingHolySpirit,
          previousChurch: formData.previousChurch,
          ministryInterests: formData.ministryInterests,
          willingServe: formData.willingServe,
          willingPrayers: formData.willingPrayers,
          willingTithes: formData.willingTithes,
          agreeTeachings: formData.agreeTeachings,
          understandMembership: formData.understandMembership,
          declarationAccepted: formData.declarationAccepted,
          signature: formData.signature,
          submittedAt: new Date().toISOString(),
          status: "new",
        });
      } catch (err) {
        console.error("Failed to save membership to Sanity:", err);
      }
    }

    // Generate PDF
    const pdfBuffer = generatePDF(formData);
    const filename = `TCBC_Membership_${formData.firstName}_${formData.lastName}.pdf`;

    // Send email with PDF attachment
    await sendEmail({
      subject: `New Membership Application — ${formData.firstName} ${formData.lastName}`,
      html: `
        <h2>New Membership Application</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
        <p>Please see the attached PDF for full details.</p>
      `,
      attachments: [
        {
          filename,
          content: Buffer.from(pdfBuffer),
          contentType: "application/pdf",
        },
      ],
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
