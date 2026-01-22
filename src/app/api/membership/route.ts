import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

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

function generatePDF(data: MembershipFormData): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    doc.on("end", () => {
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const result = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      resolve(result);
    });
    doc.on("error", reject);

    doc.fontSize(20).font("Helvetica-Bold").text("TCBC MEMBERSHIP APPLICATION FORM", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica").text("The Chosen Bible Church", { align: "center" });
    doc.moveDown(1);

    doc.fontSize(10).text("Kindly complete the following form if you are interested in being a member at The Chosen Bible Church (TCBC). You must be 18 years of age or older.", { align: "left" });
    doc.moveDown(1);

    doc.fontSize(12).font("Helvetica-Bold").text("PERSONAL INFORMATION");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");

    doc.text(`First Name: ${data.firstName}`);
    doc.text(`Last Name: ${data.lastName}`);
    doc.text(`Preferred Name: ${data.preferredName}`);
    doc.text(`Date of Birth: ${data.dateOfBirth}`);
    doc.text(`Gender: ${data.gender}`);
    doc.text(`Marital Status: ${data.maritalStatus}`);
    doc.text(`Phone Number: ${data.phoneNumber}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Home Address: ${data.homeAddress}`);
    doc.moveDown(1);

    doc.fontSize(12).font("Helvetica-Bold").text("CHURCH INFORMATION");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");

    doc.text(`Member Since: ${data.memberSince || "N/A"}`);
    doc.text(`How did you hear about TCBC?: ${data.heardAbout}`);
    doc.text(`Accepted Jesus Christ as Lord and Savior: ${data.acceptedJesus ? "Yes" : "No"}`);
    doc.text(`Baptized in water by immersion: ${data.baptizedWater ? "Yes" : "No"}`);
    if (data.baptizedWater) {
      doc.text(`Year of baptism: ${data.baptizedWaterYear}`);
    } else if (data.willingBaptism) {
      doc.text(`Willing to be baptized: ${data.willingBaptism}`);
    }
    doc.text(`Received baptism in Holy Spirit: ${data.baptizedHolySpirit ? "Yes" : "No"}`);
    if (data.baptizedHolySpirit) {
      doc.text(`Year: ${data.baptizedHolySpiritYear}`);
    } else if (data.willingHolySpirit) {
      doc.text(`Willing to receive Holy Spirit baptism: ${data.willingHolySpirit}`);
    }
    doc.text(`Previous Church: ${data.previousChurch || "N/A"}`);
    doc.moveDown(1);

    doc.fontSize(12).font("Helvetica-Bold").text("MINISTRY INTERESTS");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");
    if (data.ministryInterests.length > 0) {
      data.ministryInterests.forEach((ministry) => {
        doc.text(`• ${ministry}`);
      });
    } else {
      doc.text("No ministries selected");
    }
    doc.moveDown(1);

    doc.fontSize(12).font("Helvetica-Bold").text("AVAILABILITY AND COMMITMENT");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");
    doc.text(`Willing to serve: ${data.willingServe ? "Yes" : "No"}`);
    doc.text(`Support with prayers and attendance: ${data.willingPrayers ? "Yes" : "No"}`);
    doc.text(`Support with tithes and offerings: ${data.willingTithes ? "Yes" : "No"}`);
    doc.text(`Agree to uphold Church teachings: ${data.agreeTeachings ? "Yes" : "No"}`);
    doc.text(`Understand membership terms: ${data.understandMembership ? "Yes" : "No"}`);
    doc.moveDown(1);

    doc.fontSize(12).font("Helvetica-Bold").text("DECLARATION");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");
    doc.text("I declare that the information provided above is accurate to the best of my knowledge.");
    doc.moveDown(1);

    doc.fontSize(12).font("Helvetica-Bold").text("SIGNATURE");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");
    doc.text(`Applicant's Signature: ${data.signature}`);
    doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`);
    doc.moveDown(2);

    doc.fontSize(10).font("Helvetica-Bold").text("FOR OFFICE USE ONLY");
    doc.moveDown(0.5);
    doc.fontSize(10).font("Helvetica");
    doc.text("Membership Orientation Completed: ☐ Yes ☐ No");
    doc.text("Date Received: _______________________");
    doc.text("Church Leader's Signature: _______________________");

    doc.end();
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData: MembershipFormData = await request.json();

    const pdfBuffer = await generatePDF(formData);

    const filename = `TCBC_Membership_${formData.firstName}_${formData.lastName}_${Date.now()}.pdf`;

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
