const express = require('express');
const bodyParser = require('body-parser');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "presensi"
});

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
});

const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var nama = req.body.nama;
    var absen = req.body.absen;

    console.log(nama, " ", absen);

    var sql = "INSERT INTO absen (nama, absen) VALUES('" + nama + "','" + absen + "')";
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log("Rec inserted!");
    });
    res.sendFile(__dirname + "/terimakasih.html")
});

app.listen(3000, function(){
    console.log("server is running on port 3000")
});