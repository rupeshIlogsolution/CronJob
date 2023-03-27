let xlsx = require("json-as-xlsx")
const sql = require('mssql');
const { con } = require('./config')

const generateExcel = async () => {
  let exceldata = [];
  try {
    await sql.connect(con)
    const result = await sql.query`SELECT type_of_issue,priority from IPERISCOPE.dbo.tbl_ticket tt `
    exceldata = result.recordset;
  }
  catch (err) {
    console.log(err)
    return 0
  }



  let data = [
    {
      sheet: "INWARD",
      columns: [
        { label: "Issue Type", value: "type_of_issue" },
        { label: "Priority", value: "priority" },
        // { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, 
      ],
      // content: [
      //   { user: "Rupesh", age: 20, more: { phone: "11111,111" } },
      //   { user: "Kumar", age: 21, more: { phone: "12345678" } },
      // ],

      content: exceldata
    },
    {
      sheet: "OUTWARD",
      columns: [
        { label: "User", value: "user" },
        { label: "Age", value: "age", format: '# "years"' },
        { label: "Phone", value: "more.phone", format: "(###) ###-####" },
      ],
      content: [
        { user: "Manuel", age: 16, more: { phone: 9999999900 } },
        { user: "Ana", age: 17, more: { phone: 8765432135 } },
      ],
    },
  ]

  let settings = {
    fileName: "ExcelData",
    extraLength: 3,
    writeMode: "writeFile",
    writeOptions: {},
    RTL: false,
  }

  xlsx(data, settings)

}


module.exports = { generateExcel }
