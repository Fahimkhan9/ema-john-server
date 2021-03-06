
const express = require('express')
const cors  = require("cors")
const bodyparser = require("body-parser")
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 5000
require('dotenv').config()


app.use(cors())
app.use(bodyparser.json())
// console.log(process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vigvf.mongodb.net/${processe.env.DB_NAME}?retryWrites=true&w=majority`;

 
app.get("/",(req,res) => {
  res.send("hello it is working")
})

const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("store").collection("store");
  const orderscollection = client.db("store").collection("orders");
  
app.post("/addproduct",(req,res) => {
    const product = req.body
    // console.log(product);
    productsCollection.insertOne(product)
    .then(result => {
        // console.log(result)
    res.send(result.insertedCount)
    })
})

app.get("/products",(req,res) => {
  const filter = req.query.filter
    productsCollection.find({name: {$regex: filter}})
    .toArray((err,ele) => {
      // console.log(ele);
        res.send(ele)
    })
})
app.get("/product/:key",(req,res) => {
  productsCollection.find({key: req.params.key})
  .toArray((err,ele) => {
      res.send(ele[0])
  })
})

app.post("/getfewproductsbykeys",(req,res) => {
  const productkeys =req.body

  productsCollection.find({key:{$in:productkeys}})
  .toArray((err,ele)=>{
res.send(ele)

  })
})

app.post("/addorder",(req,res) => {
  const orderinfo = req.body
  // console.log(product);
  orderscollection.insertOne(orderinfo)
  .then(result => {
      // console.log(result)
  res.send(result.insertedCount>0)
  })
})

console.log("db connected");
});







app.listen( process.env.PORT || port)




