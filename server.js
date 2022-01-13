const express=require('express')
const app=express()
require('dotenv').config()
const client = require('twilio')(process.env.Account_SID,process.env.Auth_Token)
app.use(express.json())
//Send Code
app.get('/register',(req,res)=>{
    client.verify.services(process.env.ServiceSID).verifications.create({
        to:req.body.phone,
        channel:'sms',
    }).then(data=>{
        res.send(data)
    })

})
//Varify Code
app.post('/verify',(req,res)=>{
client.verify.services(process.env.ServiceSID).verificationChecks.create({
    to:req.body.phone,
    code:req.body.code
}).then(data =>{res.send(data)})
})
app.listen(3000,()=>{
    console.log("SERVER is Active.")
})