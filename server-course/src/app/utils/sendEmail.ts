import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user:"",
            pass:"",
        }
})

export const sendEmail = async(to: string, subject: string, text: string) => {
    try {
            await transporter.sendMail({
                from: "smtp_user",
                to,
                subject,
                text
            })
    } catch (error) {
        console.error("sendEmail error:", error)
    }
}