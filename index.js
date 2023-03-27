const cron = require('node-cron');
const {generateExcel } = require('./Xlsxtojson');


cron.schedule('*/3 * * * * *', () => {
    generateExcel()
    console.log('running a task every minute');
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
}
);

// ######################### Schedular For Run Task At 2:28 PM
// cron.schedule('0 28 14 * * *', () => {
//     console.log('running a task every minute');
// }, {
//     scheduled: true,
//     timezone: "Asia/Kolkata"
// }
// );