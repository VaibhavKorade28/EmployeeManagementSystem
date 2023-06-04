const mysql=require("mysql");

var mysqlconnection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'Hitman@45',
    database:'test',
    port:'3306'
})
mysqlconnection.connect(function(err){
    if(err){
        console.log("couldnt connect"+ JSON.stringify(err));
    }
    else{
        console.log("connection done successful")
    }
})
module.exports=mysqlconnection;