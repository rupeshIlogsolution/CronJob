let xlsx = require("json-as-xlsx")
const sql = require('mssql');
const { con } = require('./config')

const generateExcel = async () => {
  let exceldata = [];
  let empData = [];
  let stockes = [];
  try {
    await sql.connect(con)
    const result = await sql.query`SELECT type_of_issue,priority from IPERISCOPE.dbo.tbl_ticket with (nolock)`
    exceldata = result.recordset;

    const emp = await sql.query`SELECT employee_name,employee_email,employee_number from IPERISCOPE.dbo.tbl_employee_master with (nolock)`;
    empData = emp.recordset;

    const stk = await sql.query`select asset_type,serial_no,manufacture,model from IPERISCOPE.dbo.tbl_new_assets tna with (nolock) `;
    stockes = stk.recordset;
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
    {
      sheet: "Stocks",
      columns: [
        { label: "Asset Type", value: "asset_type" },
        { label: "Serial no", value: "serial_no" },
        { label: "Manufacture", value: "manufacture" },
        { label: "Model", value: "model" },
      ],
      content: stockes
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
