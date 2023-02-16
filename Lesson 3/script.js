//console.log("Privet")
//var os = require('os')
//console.log(os.arch())

var express = require("express")
var app = express()
app.use(express.static("./"))

app.get('/',(req,res)=>{
    res.redirect("index.html")
})

app.get('/about',(req,res)=>{
    res.send("<h1>About</h1>")
})

app.get('/contact',(req,res)=>{
    res.send("<h1>Contact</h1>")
})

app.get('/products',(req,res)=>{
    res.redirect("products.html")
})

app.get('/products/:name',(req,res)=>{
    const name = req.params.name
    res.send(`Your product is ${name}`)
})

app.get('/google',(req,res)=>{
    res.redirect("https://google.com")
})

app.get('/google/:name',(req,res)=>{
    const name = req.params.name
    res.redirect(`https://google.com/search?q=${name}`)
})

app.get("/*",(req,res)=>{
    res.send("404")
})
app.listen(3000)