const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const imgPath = path.join(__dirname, './data/user_logo.png');
const imgData = fs.readFileSync(imgPath);

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

    async sendActivationMail(to, link, name, surName) {
        const htmlContent = `
        <div style="background-color:#d9e5f0;  margin:0;-webkit-text-size-adjust:none;text-size-adjust:none; height:600px; padding-top: 100px; padding: 100px;">
            <table class="nl-container" width="100%" height="400px" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="mso-table-lspace:0;mso-table-rspace:0;margin: auto auto;background-color:#1D728F;background: linear-gradient(135deg, #207896 0%, #0e5872 100%); border-radius: 8px; max-width: 600px; max-height: 400px; padding: 21px 60px 29px 36px;" >
                <tbody>
                    <tr>
                        <td>
                            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                cellspacing="0" role="presentation"
                                                style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:600px;margin:0 auto"
                                                width="600" >
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%"
                                                            style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                            <table class="paragraph_block block-1" width="100%" border="0"
                                                                cellpadding="10" cellspacing="0" role="presentation"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div
                                                                            style="color:#e7edf3;direction:ltr;font-family:Roboto,Tahoma,Verdana,Segoe,sans-serif;font-size:32px;font-weight:500;letter-spacing:0;line-height:120%;text-align:left;mso-line-height-alt:38.4px">
                                                                            <p style="margin:0">DCC CERTIFICATE</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                cellspacing="0" role="presentation"
                                                style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:600px;margin:0 auto"
                                                width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="100%"
                                                            style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                            <table class="paragraph_block block-1" width="100%" border="0"
                                                                cellpadding="10" cellspacing="0" role="presentation"
                                                                style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div
                                                                            style="color:#d9e5f0;direction:ltr;font-family:Roboto,Tahoma,Verdana,Segoe,sans-serif;font-size:18px;font-weight:400;letter-spacing:0;line-height:160%;text-align:justify;mso-line-height-alt:21.599999999999998px">
                                                                            <p style="margin:0">${surName} ${name}, здравствуйте! <br>
                                                                                Для подтверждения регистрации на платформе
                                                                                перейдите по ссылке ниже.</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                cellspacing="0" role="presentation"
                                                style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:600px;margin:0 auto"
                                                width="600">
                                                <tbody>
                                                    <tr>
                                                        <td class="column column-1" width="38%"
                                                            style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                            <table class="button_block block-1" width="100%" border="0"
                                                                cellpadding="10" cellspacing="0" role="presentation"
                                                                style="mso-table-lspace:0;mso-table-rspace:0">
                                                                <tr>
                                                                    <td class="pad">
                                                                        <div class="alignment" align="start" ><!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:50px;width:196px;v-text-anchor:middle;" arcsize="9%" stroke="false" fillcolor="#d6e2ea">
        <w:anchorlock/>
        <v:textbox inset="0px,0px,0px,0px">
        <center dir="false" style="color:#1d728f;font-family:Tahoma, Verdana, sans-serif;font-size:18px">
        <![endif]-->
                                                                            <a href="${link}" target="_blank"
                                                                                style="
                                                                                background-color:#d6e2ea;
                                                                                border-bottom:0px solid transparent;
                                                                                border-left:0px solid transparent;
                                                                                border-radius:4px;
                                                                                border-right:0px solid transparent;
                                                                                border-top:0px solid transparent;
                                                                                color:#1d728f;
                                                                                display:inline-block;
                                                                                font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;
                                                                                font-size:18px;
                                                                                font-weight:700;
                                                                                mso-border-alt:none;
                                                                                padding-bottom:16px;
                                                                                padding-top:16px;
                                                                                text-align:center;
                                                                                text-decoration:none;
                                                                                width:100%;
                                                                                word-break:keep-all;
                                                                                ">
                                                                                    <span
                                                                                        style="
                                                                                        padding-left:20px;
                                                                                        padding-right:20px;
                                                                                        font-size:18px;
                                                                                        display:inline-block;
                                                                                        letter-spacing:normal;
                                                                                    ">
                                                                                        <span
                                                                                            style="word-break: break-word; line-height: 18px;">Подтвердить</span></span></a>
                                                                            <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td class="column column-2" width="62%"
                                                            style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                            <table class="image_block block-1" width="100%" border="0"
                                                                cellpadding="0" cellspacing="0" role="presentation"
                                                                style="mso-table-lspace:0;mso-table-rspace:0">
                                                                <tr>
                                                                    <td class="pad" style="width:100%">
                                                                        <div class="alignment" align="right"
                                                                            style="line-height:10px">
                                                                            <div style="max-width:400px">
                                                                            <img
                                                                                    src="cid:usercid"
                                                                                    style="display:block;height:auto;border:0;width:100%;max-width:200px; pointer-events:none"
                                                                                    width="400" height="auto">
                                                                                </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table><!-- End -->
        
    </div>
    `;
        const message = {
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: '',
            html: htmlContent,
            attachments: [
                {
                    filename: 'user.png',
                    content: imgData,
                    cid: 'usercid'
                }
            ]
        };

        await this.transporter.sendMail(message);
    }
}

module.exports = new MailService();