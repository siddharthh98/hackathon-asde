let transporter = nodemailer.createTransport({
 service: 'gmail',
 secure: false,
 port: 25,
 auth: {
   user: 'john@gmail.com',
   pass: '1234'
 },
 tls: {
   rejectUnauthorized: false
 }
});

let HelperOptions = {
 from: '"John" <john@gmail.com',
 to: 'jack@gmail.com',
 subject: 'dd',
 text: 'dd'
};



 transporter.sendMail(HelperOptions, (error, info) => {
   if (error) {
     return console.log(error);
   }
   console.log("The message was sent!");
   console.log(info);
 });