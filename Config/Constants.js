module.exports = Object.freeze({
    CATEGORIES_SECTIONS: ['Publication', 'Activity', 'Member'],
    SMTP_CONFIG: {
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
    }
})