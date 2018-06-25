let nodemailer = require('nodemailer')
let smtpTransport = require('nodemailer-smtp-transport');
let config = require('./../../config/config.default.js');

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

/**
 * 发送邮件
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 * @return {Promise} resolve(response) reject(error)
 */
let Mailer = (recipient, subject, html) => new Promise((resolve, reject) => {
    smtpTransport.sendMail({
        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html
    }, (error, response) => {
        if (error) {
            return reject(error);
        }
        resolve(response);
    });
});

module.exports = Mailer;
