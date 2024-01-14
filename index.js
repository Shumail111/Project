const express=require("express")
const mongoose=require('mongoose')
const UserData=require("./view")
const bodyParser=require('body-parser')

const app=express();

const PORT= 5000;

// for connecting Database
mongoose.connect("mongodb://127.0.0.1:27017/fullstack47",{useNewUrlParser:true})

app.use(bodyParser.json())
// for built Api

app.post("/post",(req,res)=>{
    const Data=UserData(req.body)
    Data.save().then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
})

// for getting the data

app.get("/get",(req,res)=>{
            UserData.find((err,user)=>{
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).send(user)
        }
    })
})

// for delete the data

app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
     
   UserData.findByIdAndRemove(id,(err,user)=>{
    if(err){
        console.log("Api failed to fetch")
    }else{
        res.status(200).send("deleted successfully")
    }
   }) 
})

//for editting the data

app.get("/show/:id",(req,res)=>{
    const id=req.params.id;
    UserData.findById(id,(err,user)=>{
        if(err){
            console.log(err)    
        }else{
            res.status(200).send(user)
        }
    })
})

//for updating the data
app.post("/show/:id",(req,res)=>{
    const id=req.params.id;
    UserData.findById(id,(err,user)=>{
        if(err){
            console.log(err)
        }else{
            user.name=req.body.name;
            user.email=req.body.email;
            user.phone=req.body.phone;
            user.save().then((used)=>{
                res.status(200).send(used)
            }).catch((error)=>{
                 console.log("api failed")
            })
        }
    })
})





// for checking database connected
mongoose.connection.once("open",()=>{
    console.log("Database is Connected Successfully")
})

// for connecting port

app.listen(PORT,( )=>{
    console.log("port is Connected")
})