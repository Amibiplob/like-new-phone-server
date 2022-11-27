const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sgq11wr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});





async function run() {
  try {
    const database = client.db("Like-New-Phone");
    const brandCollection= database.collection("Brand");
    const contractCollection= database.collection("contract");
    // create a document to insert

app.get("/brand",async (req, res) => {
  const query ={};
   const cursor = brandCollection.find(query);
   const result = await cursor.toArray();
console.log(result)
  res.send(result);
});
app.post("/contract",async(req,res)=>{
  const contract =req.body;
  const result =await contractCollection.insertOne(contract)
  console.log(contract)
  res.send(result)
})

  } finally {
   
  }
}
run().catch(console.dir);













app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log("server is working", port);
});
