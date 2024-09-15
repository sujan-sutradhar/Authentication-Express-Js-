const express = require('express')
const app= express();
const path = require('path')
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())


app.get('/',function(req,res){
     res.render('index')
})
app.post('/register', async function(req,res){
     let { username,name, email,age,password} = req.body;
      let user = await userModel.findOne({email})
      if(user) return res.status(500).send("User Alredy  Exits")
    
      bcrypt.genSalt(10,(err,salt )=>{
          bcrypt.hash(password,salt, async (err,hash)=>{
             let user=  await userModel.create({
                    username,name, email,age,password:hash
                  })
                  let token = jwt.sign({email:email,userid:user._id},"xhxssh")
      res.cookie("token",token)
      res.status(200).send("Congoooo !! You are now register succesfully !")
          })
      })
     
// //    console.log(user)
})

app.get('/login',function(req,res){
     res.render('login')
})
app.post('/login', async function(req,res){
     let{email,password}=req.body;
     let user =  await  userModel.findOne({email});
     if(!user) res.send("Something went wrong");
     bcrypt.compare(password,user.password,(err,result)=>{
          if(result) res.status(200).send("Loogeed in")
          else res.redirect('/login')
     })
})
app.get('/logout',function(req,res){
      res.cookie("token","")
      res.redirect("/")
})
app.listen(3000)