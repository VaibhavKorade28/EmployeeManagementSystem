const express=require("express");
const router=express.Router();
const connection=require("../db/dbconnection");
const fs=require("fs");
router.get("/employees",function(req,resp)
{
    connection.query("select * from employee",function(err,data,fields)
    {
        if(err)
        {
            resp.status(500).send(JSON.stringify(err));
        }
        else{
            resp.render("index",{empdata:data});
        }
    })
})
router.get("/displayaddform",function(req,resp)
{
    
            resp.render("add-emp");
        
    })
router.post("/insertEmployee",function(req,resp)
{
    var empid=req.body.empid
    var ename=req.body.ename;
    var sal=req.body.sal;
    connection.query("insert into employee values(?,?,?)",[empid,ename,sal],function(err,data,fields)
    {
        if(err)
        {
            resp.status(500).send(JSON.stringify(err));
        }
        else{
            resp.redirect("/employees");
        }
    })
})
router.get("/edit/:empid",function(req,resp)
{
    connection.query("select * from employee where empid=?",[req.params.empid],function(err ,data,fields)
    {
        if(err)
        {
            resp.status(500).send(JSON.stringify(err))
        }
        else{
            resp.render("update-emp",{emp:data[0]});
        }
    })
})
router.post("/updatedetails",function(req,resp)
{
    var empid=req.body.eid;
    var ename=req.body.enm;
    var sal=req.body.esal;
    connection.query("update employee set sal=?,ename=? where empid=?",[sal,ename,empid],function(err,data,fields)
    {
        if(err)
        {
            resp.status(500).send(JSON.stringify(err));
        }
        else{
            resp.redirect("/employees");
        }
    })
})
router.get("/delete/:empid",function(req,resp)
{
    connection.query("delete from employee where empid=?",[req.params.empid],function(err,data,fields)
    {
        if(err)
        {
            resp.status(500).send(JSON.stringify(err));
        }
        else{
            resp.redirect("/employees");
        }
    })
})
router.get("/login",function(req,resp)
{
    var rs=fs.createReadStream("./public/login.html");
    rs.pipe(resp);
})
router.post("/validateuser",function(req,resp)
{
    var uname=req.body.uname;
    var passwd=req.body.passwd;
    connection.query("select * from user where uname=? and passwd=?",[uname,passwd],function(err,data,fields)
    {
        if(err)
        {
            resp.status(500).send(err);
        }
        else{
            if(data[0]!==undefined)
            {
                resp.redirect("/employees");
            }
            else{
                resp.send("Invalid credentials <br> <a href='/register'>Register me</a>");
                //resp.redirect("/register");            }
            }
        }
    })
});
router.get("/register",function(req,resp)
{
    var rs=fs.createReadStream("./public/registration.html");
    rs.pipe(resp);
});
router.post("/storedetails",function(req,resp)
{
    var uname=req.body.uname;
    var name=req.body.nm;
    var passwd=req.body.passwd;
    connection.query("insert into user values(?,?,?)",[name,uname,passwd],function(err,data,fields)
    {
        if(err)
        {
            resp.status(500).send("username  already exists pleases try with another username<br> <a href='/register'>Register here</a>")
        }
        else{
            resp.send("Success!! You have been registered <br> <a href='/login'>Login here</a>");
        }
    })
})
module.exports=router;
