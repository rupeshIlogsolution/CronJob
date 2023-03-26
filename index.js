const cron = require('node-cron');
const xlsx = require("json-as-xlsx");
const {data, settings } = require('./Controller/Xlsxtojson');


cron.schedule('*/2 * * * * *', () => {
    xlsx(data,settings)
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