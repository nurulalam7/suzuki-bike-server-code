const express = require('express')
const app = express()

const cors =require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wprwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

const port = process.env.PORT || 5000;
app.use(cors());


async function run(){
    try{
        await client.connect();
        const database = client.db("motorbike");
        const servicesCollection=database.collection('services');

        // post api 
        app.post('/services',async(req,res)=>{
            const service=req.body;
  
        //   console.log('hit the post',service);
  
          const result=await servicesCollection.insertOne(service);
          console.log(result);
  
          res.json(result)
        })
         
  
  
  
  
  
       
  
        await client.connect();
        console.log('motor bike is ready')

    }

    finally{
        // await client close 
    }





}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('motor bike is ready for giving service')
  })
  
  app.listen(port, () => {
    console.log(` listening at ${port}`)
  })