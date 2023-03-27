const nodemailer = require('nodemailer');
const { con } = require('./config');
const sql = require('mssql');
dotenv.config();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    },
});

let userMailIds = [];

async function getMailid() {
    try {
        await sql.connect(con)
        const result = await sql.query`SELECT user_mail from Ube82.dbo.tbl_usermail`
        if (result.recordset.length > 0) {
            result.recordset.map(item => {
                userMailIds.push(item.user_mail)
            })
        }
    }
    catch (err) {
        console.log(err)
        return 0
    }
}

async function sendMailFun() {
    let message = {
        from: process.env.MAIL,
        to: userMailIds,
        subject: "Mail test",
        text: "Hello world?",
        html: "Done Mail sent",
        attachments: [{
            filename: 'ExcelData.xlsx',
            path: './ExcelData.xlsx'
        }]
    }

     await transporter.sendMail(message)
}

module.exports = { getMailid,sendMailFun }