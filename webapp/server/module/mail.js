/*
封装一个发送邮件的模块
调用传递参数的方式  来到达到简化调用
*/
const nodemailer = require('nodemailer');
//创建发送邮件的对象
let transporter = nodemailer.createTransport({
    service: 'qq', // 运营商选择   qq   网易
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "admin@kacoro.com", // 发送方的邮箱
        pass: 'qweqweqweewqew' //   pop3 授权码 **百度如何获取吧**
    }
});

//邮件内容
let mail = {
    transporter: transporter,
    send(mail, content, callback) {
        let mailOptions = {
            from: '"Fred Foo ?" <11111111111@qq.com>', // 发送方邮箱
            to: mail, // list of receivers
            subject: '欢迎注册√', // Subject line
            text: `${content}`, // plain text body
            html: `欢迎注册点菜系统,验证码为:${content},有效期为五分钟.` // html body   
        }

        //发送邮件
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                callback(-1); // 失败
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            callback(1); // 成功
        });
    }
}
module.exports = mail;