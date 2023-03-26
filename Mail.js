const nodemailer = require('nodemailer');


const mailsIds = ['rupeshlkr18@gmail.com', 'rupeshlkr93@gmail.com']

async function main(mailid) {

    console.log(mailid)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rupeshlkrmail@gmail.com', // generated ethereal user
            pass: 'uuuugzjvvxrfqpdi', // generated ethereal password
        },
    });


    let message = {
        from: 'rupeshlkrmail@gmail.com', // sender address
        to: mailid, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "Done SuccessFUlly again", // html body
        attachments:[{
            filename:'ExcelData.xlsx',
            path:'./ExcelData.xlsx'
        }]
    }


   const sensMail= await transporter.sendMail(message)
   console.log(sensMail)
}

mailsIds.map(item => {

    main(item)
})