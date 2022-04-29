const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "praktikum_react3"
})

db.connect(err =>{
    if (err) {
        console.log(err.message)
    }
    else{
        console.log("koneksi berhasil")
    }
})

module.exports = db