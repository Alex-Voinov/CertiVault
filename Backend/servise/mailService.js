const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to, link) {
        const htmlContent = `
            <div >   
                <a href="${link}">Активировать аккаунт</a>         
            </div>
        `;

        const message = {
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: '',
            html: htmlContent,
            attachments: []
        };

        await this.transporter.sendMail(message);
    }
}

module.exports = new MailService();