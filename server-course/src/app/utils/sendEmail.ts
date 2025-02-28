import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com' as string,
    port: 25,
    secure: config.NODE_ENV === 'production',
    auth: {
        user: '12mhrafi@gmail.com' as string,
        pass: 'dszm lfza hcqx kwoe' as string
    }
})

export const sendEmail = async (to: string, subject: string, text: string) => {

    await transporter.sendMail({
        from: "12mhrafi@gmail.com",
        to,
        subject,
        text,
        html: `
                Dear user,

                We wanted to let you know that your password was successfully changed. If you made this change, no further action is needed.

                If you did not request this change, please reset your password immediately and contact our support team at 12mhrafi@gmail.com for assistance.

                For security reasons, we recommend choosing a strong and unique password.

                If you need to reset your password, click the link below:
                ${text}

                If you have any questions, feel free to reach out to us.

                Best regards,
                [12mhrafi@gmail.com
            
           `
    })

}

