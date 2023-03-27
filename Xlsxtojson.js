let xlsx = require("json-as-xlsx")
const sql = require('mssql');
const { con } = require('./config')

const generateExcel = async () => {
  let exceldata = [];
  let empData = [];
  try {
    await sql.connect(con)
    const result = await sql.query`SELECT type_of_issue,priority from IPERISCOPE.dbo.tbl_ticket tt`
    exceldata = result.recordset;

    const emp = await sql.query`SELECT employee_name,employee_email,employee_number from IPERISCOPE.dbo.tbl_employee_master tem`;
    empData = emp.recordset;
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
      ],
      content: exceldata
    },
    {
      sheet: "OUTWARD",
      columns: [
        { label: "Name", value: "employee_name" },
        { label: "Email", value: "employee_email" },
        { label: "Phone", value: "employee_number" },
      ],
      content: empData
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
