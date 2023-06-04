const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const routes=require("./router/route");
const path=require("path");
app.use(bodyparser.urlencoded({extended:false}))

app.use("/",routes);

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")))

app.listen(3002,function(){
    console.log("server started at port 3002")
})
module.exports=app;
