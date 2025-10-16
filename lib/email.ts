import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormEmail {
    name: string;
    email: string;
    message: string;
    phone?: string;
}

export async function sendContactEmail(data: ContactFormEmail) {
    try {
        // Send notification to admin
        const { data: adminData, error: adminError } = await resend.emails.send(
            {
                from: process.env.FROM_EMAIL || "noreply@holistic.com",
                to: process.env.ADMIN_EMAIL || "admin@holistic.com",
                subject: `New Contact Form Submission from ${data.name}`,
                html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            <p><strong>Message:</strong></p>
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${data.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Holistic Physical Therapy website contact form.
          </p>
        </div>
      `,
            },
        );

        if (adminError) {
            console.error("Admin email error:", adminError);
            throw adminError;
        }

        // Send confirmation to user
        const { data: userData, error: userError } = await resend.emails.send({
            from: process.env.FROM_EMAIL || "noreply@holistic.com",
            to: [data.email],
            subject: "Thank you for contacting Holistic Physical Therapy",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center; margin-bottom: 30px;">
            Thank You for Contacting Us!
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Dear ${data.name},</p>
            
            <p>Thank you for reaching out to Holistic Physical Therapy. We have received your message and will get back to you as soon as possible.</p>
            
            <div style="background-color: #fff; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0;">
              <p><strong>Your message:</strong></p>
              <p>${data.message.replace(/\n/g, "<br>")}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666;">
              If you have any urgent questions, please call us or visit our clinic.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
            <p style="margin: 5px 0;">
              <strong>Holistic Physical Therapy</strong><br>
              Tel: [Your Phone Number]<br>
              Email: [Your Email Address]<br>
              Address: [Your Clinic Address]
            </p>
          </div>
        </div>
      `,
        });

        if (userError) {
            console.error("User email error:", userError);
            // Don't throw here since admin notification was sent
        }

        return {
            success: true,
            adminId: adminData?.id,
            userId: userData?.id,
        };
    } catch (error) {
        console.error("Email service error:", error);
        throw error;
    }
}
