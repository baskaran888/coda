const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'sample@gmail.com',
        pass: '123456'
    }
});

const send = async (payload) => {

    const mailOptions = {
        from: 'sample@gmail.com',
        to: `${payload.email}`,
        subject: 'Product Confirmation Mail',
        text: `Your Product Confirmation Agreed`,
    };

    await transporter.sendMail(mailOptions, function (err, data) {

        if (err) {
            console.log('Error occurs', err);
        } else {
            console.log('Email sent', data);
        }

    });
};

exports.send = send;
