import * as nodemail from 'nodemailer';

export const sendmail = (from, to, subject, html) => {
    const transporter = nodemail.createTransport({
        service: 'Gmail',
        auth: {
            user: 'okaforechezona1992@gmail.com',
            pass: 'ogbunike',
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}