const cron = require('node-cron');
const { generateExcel } = require('./Xlsxtojson');
const { getMailid, sendMailFun } = require('./Mail')


// ######################### Scheduler for Create Excel File & Get Mail Id's ######################################

cron.schedule('0 1 12 * * *', () => {
    // getMailid()
    // generateExcel()
    console.log('Excel Created');
    console.log('Excel Created',Date());
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
}
);


// ######################### Scheduler for Sent Mail ######################################

cron.schedule('15 1 12 * * *', () => {
    // sendMailFun()
    console.log('Done Mail Send',Date());
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
}
);
