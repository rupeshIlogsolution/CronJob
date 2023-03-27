const cron = require('node-cron');
const { generateExcel } = require('./Xlsxtojson');
const { getMailid, sendMailFun } = require('./Mail')


// ######################### Scheduler for Create Excel File & Get Mail Id's ######################################

cron.schedule('58 40 12 * * *', () => {
    getMailid()
    generateExcel()
    console.log('Excel Created',Date());
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
}
);


// ######################### Scheduler for Sent Mail ######################################

cron.schedule('15 38 12 * * *', () => {
    sendMailFun()
    console.log('Done Mail Send',Date());
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
}
);

// ######################### Scheduler for Delete Excel File ######################################

// cron.schedule('15 29 12 * * *', () => {
//     try {
//         fs.unlinkSync('ExcelData.xlsx');
      
//         console.log("Delete File successfully.");
//       } catch (error) {
//         console.log(error);
//       }
// }, {
//     scheduled: true,
//     timezone: "Asia/Kolkata"
// }
// );
