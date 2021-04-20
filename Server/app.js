const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')
require('./models/user')
mongoose.model("User")
app.use(express.json())
app.use(require('./routes/auth'))
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB")
})
mongoose.connection.on('error',(err)=>{
    console.log("error in connection",err)
})
// const customMiddleware = (req, res, next)=>{
//     console.log("middleware executed!!")
//     next()
// }

// //app.use(customMiddleware)

// app.get('/',(req,res)=>{
//     console.log("home")
//     res.send("Hello World !")
// })

// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("about")
//     res.send("about page")
// })

app.listen(PORT, ()=>{
    console.log("server is running on", PORT)
})