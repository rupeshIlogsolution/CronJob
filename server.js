const sql= require('mssql');
const con= {
    user: 'Fins_admin',
    password:'#@)#n%^$4?#?$',
    database:'master',
    server: '192.168.146.79',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        SSL:true
      }
}

const test= async () => {
    try {
        console.log('mls')
     await sql.connect(con)
     const result = await sql.query`SELECT type_of_issue,priority from IPERISCOPE.dbo.tbl_ticket tt `
     console.log('mlerfers')

     console.dir(result)
    } catch (err) {
        console.log(err)
    }
   }
   test()
