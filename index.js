const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    const contractCollection= database.collection("contract");
    const userCollection= database.collection("user");
    const productCollection= database.collection("product");
    const productcategoryCollection = database.collection("productcategory");
  const  advertisedItemCollection = database.collection(" AdvertisedItem");
  const myOrdersCollection = database.collection("myorders");
    // create a document to insert



app.post("/contract",async(req,res)=>{
  const contract =req.body;
  const result =await contractCollection.insertOne(contract)
 
  res.send(result)
})



app.post("/user",async(req,res)=>{
  const user =req.body;
  const result =await userCollection.insertOne(user)
  res.send(result)
})







app.post("/product", async (req, res) => {
  const product = req.body;
  const result = await productCollection.insertOne(product);
  res.send(result);
});




app.get("/myproduct", async (req, res) => {
  const query = {email:req.query.email};
  const cursor =productCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});







app.post("/productcategory",async(req,res)=>{
  const productcategory =req.body;
  const result =await productcategoryCollection.insertOne(productcategory)
 
  res.send(result)
})




app.get("/productcategory", async (req, res) => {
  const query = {};
  const cursor = productcategoryCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});






app.get("/allproduct", async (req, res) => {
  const query = {};
  const cursor = productCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});


app.get("/allproduct/:product", async (req, res) => {
  const categoryProduct =req.params.product;

   const query = { productCategory: categoryProduct };
 
   const cursor = productCollection.find(query);
   // print a message if no documents were found
   if ((await cursor.count()) === 0) {
     console.log("No documents found!");
   }
  const result = await cursor.toArray();
  res.send(result);

});


app.get("/productdetails/:product", async (req, res) => {
  const productDetails = req.params.product;
    const query = { _id: ObjectId(productDetails) };
  const product = await productCollection.findOne(query);
const result=[product]
  res.send(result);
});





app.post("/AdvertisedItem", async (req, res) => {
  const AdvertisedItem = req.body;
  const result = await advertisedItemCollection.insertOne(AdvertisedItem);

  res.send(result);
});

app.get("/AdvertisedItem", async (req, res) => {
  const query = {};
  const cursor = advertisedItemCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
});


app.get("/admin/user", async (req, res) => {
const email =req.query.email
  const query = {Email:email};
  const result =await userCollection.findOne(query);
res.send([result])
});




app.post("/myorders", async (req, res) => {
  const MyOrders = req.body;
  const result = await myOrdersCollection.insertOne(MyOrders);

  res.send(result);
});






app.get("/myorders", async (req, res) => {
  const email = req.query.email;
  const query = { BuyerEmail: email };
  const cursor = myOrdersCollection.find(query);
  const result = await cursor.toArray();

  res.send(result);
});



app.patch("/myorders", async (req, res) => {

// create a filter for a movie to update
const filter = {_id:req.query.id };
// this option instructs the method to create a document if no documents match the filter
const options = { upsert: true };
// create a document that sets the plot of the movie
const updateDoc = {
  $set: {
    paymentStatus: "true",
  },
};
const result = await myOrdersCollection.updateOne(filter, updateDoc, options);

res.send(result)
});





app.get("/dbuser", async (req, res) => {
  const email = req.query.email;
  const query = { Email: email };
  const result = await userCollection.findOne(query);
res.send([result])
});




app.get("/allseller", async (req, res) => {
    const query = {userRole:"Seller"};
    const cursor =userCollection.find(query);
    const result = await cursor.toArray();
 res.send(result)
});






app.get("/allbuyer", async (req, res) => {
    const query = {userRole:"Normal"};
    const cursor =userCollection.find(query);
    const result = await cursor.toArray();
 res.send(result)
});





app.delete("/AdvertisedItem", async (req, res) => {
  const query = { _id:req.query.id };
    const result = await advertisedItemCollection.deleteOne(query);
    if (result.deletedCount === 1) {
    res.send("Successfully deleted one document.");
    } else {
   res.send("No documents matched the query. Deleted 0 documents.");
      }
});







app.delete("/product", async (req, res) => {
  const query = { _id:req.query.id };
    const result = await productCollection.deleteOne(query);
    if (result.deletedCount === 1) {
    res.send("Successfully deleted one document.");
    } else {
   res.send("No documents matched the query. Deleted 0 documents.");
      }
});








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
