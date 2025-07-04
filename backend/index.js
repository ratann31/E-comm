const express = require('express');
const cors=require("cors");
require('./db/config');
const User=require("./db/User");
const Product=require("./db/Product");
const app=express();
app.use(express.json());
app.use(cors());
app.post("/register",async (req,resp)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    resp.send(result);
})
app.post("/login", async (req, resp) => {
    const { email, password } = req.body;
    console.log("Received login data:", email, password);

    if (email && password) {
        let user = await User.findOne({ email });
        console.log("User found:", user);

        if (user) {
            if (user.password === password) {
                let result = user.toObject();
                delete result.password;
                resp.send(result);
            } else {
                resp.send({ result: "Incorrect password." });
            }
        } else {
            resp.send({ result: "No user found." });
        }
    } else {
        resp.send({ result: "Email and password required." });
    }
});

app.post("/add-product",async(req,resp)=>{
    let product=new  Product(req.body);
    let result=await product.save();
    resp.send(result);
});

app.get("/products",async(req,resp)=>{
    const products=await Product.find();
    if(products.length>0){
        resp.send(products);
    }else{
        resp.send({result:"No Product Found"});
    }
});

app.delete("/product/:id",async (req,resp)=>{
    let result=await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});

app.get("/product/:id",async (req,resp)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({"result":"No result found."});
    }
})

app.put("/product/:id",async(req,resp)=>{
    let result= await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    resp.send(result);
});

app.get("/search/:key",async(req,resp)=>{
    let result=await Product.find({
        "$or":[
            {
                name:{$regex:req.params.key}
            },
            {
                category:{$regex:req.params.key}
            },
            {
                company:{$regex:req.params.key}
            }
        ]
    });
    if(result){
        resp.send(result);
    }else{
        resp.send("No result found!");
    }
})

app.listen(5000);
