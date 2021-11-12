const express = require('express')
const app = express();
const ObjectId = require('mongodb').ObjectId
const cors =require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wprwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


async function run(){
    try{
        await client.connect();
        const database = client.db("motorbike");
        const servicesCollection=database.collection('services');
        const userCollection=database.collection('users');
        const ordercollection=database.collection('orders');
        const reviewcollection=database.collection('review');

        
        app.get('/orders/:email',async(req,res)=>{
          const email=req.params.email;
          if (email){
              console.log('email',email);
              const query={email:email}
              const result=await ordercollection.find(query).toArray();
              res.send(result);

          }
         
        })

        

        app.get('/orders',async(req,res)=>{
          const cursor=ordercollection.find({});
          const order=await cursor.toArray();
          res.send(order);
      })


       //  update user 
       app.get('/orders/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const user=await ordercollection.findOne(query);
        console.log('load user with id', id);
        res.send(user);
    })

      // for given order 
      app.post('/orders',async(req,res)=>{
        const order=req.body;
        const result=await ordercollection.insertOne(order);
        res.json(result);
     })
     
     // delete api 

     app.delete('/orders/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const result = await ordercollection.deleteOne(query);
      

      console.log('delete',result);
     
      res.json(result);
     })

      // update user 
      app.get('/orders/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const user=await ordercollection.findOne(query);
        console.log('load user with id', id);
        res.send(user);
    })




      // next update api 
      app.put('/orders/:id',async(req,res)=>{
        const id=req.params.id;
        // console.log('updating user',id)
        // res.send('not dating');
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
    // create a document that sets the plot of the movie
        const updateDoc = {
        $set: {
            approved: true
        },
        };
        const result = await ordercollection.updateOne( filter,updateDoc, options);


        console.log(result);
        res.send(result);
    })

     // show only user information by login user 
       app.get('/orders/:email',async(req,res)=>{
      const email=req.params.email;
      console.log(email);
      const query={email:email}
      const result=await ordercollection.find(query).toArray();
      res.send(result);
     })


      



       // get api 
       app.get('/services',async(req,res)=>{
        const cursor=servicesCollection.find({});
        const services=await cursor.toArray();
        res.send(services);
    })

      



        ///////

        app.get('/services/:id',async(req,res)=>{
          const id = req.params.id
          console.log(id)
          if(id){
            console.log(id)
          const query = { _id: ObjectId(id) }
          const result = await servicesCollection.findOne(query)
          res.send(result)
          console.log(result)
          
    
          }
          
      });



      
     
  
        // post api 
        app.post('/services',async(req,res)=>{
            const service=req.body;
  
        //   console.log('hit the post',service);
  
          const result=await servicesCollection.insertOne(service);
          console.log(result);
  
          res.json(result)
        })

        // delete sevice 

        app.delete('/services/:id',async(req,res)=>{
          const id=req.params.id;
          const query={_id:ObjectId(id)};
          const result = await servicescollection.deleteOne(query);
          
    
          console.log('delete',result);
         
          res.json(result);
         })
    



        // for review 
        app.post('/review',async(req,res)=>{
            const reviewco=req.body;
  
        //   console.log('hit the post',service);
  
          const result=await reviewcollection.insertOne(reviewco);
          console.log(result);
  
          res.json(result)
        })


         // get api 
       app.get('/review',async(req,res)=>{
        const cursor=reviewcollection.find({});
        const reviewco =await cursor.toArray();
       
        res.send(reviewco);
    })


    app.get('/review/:id',async(req,res)=>{
      const id = req.params.id
      console.log(id)
      if(id){
        console.log(id)
      const query = { _id: ObjectId(id) }
      const result = await reviewCollection.findOne(query)
      res.send(result)
      console.log(result)
      

      }
      
  });





      




      //    // post api 

      //    app.post('/services',async(req,res)=>{
      //     const service=req.body;

      // //   console.log('hit the post',service);

      //   const result=await servicesCollection.insertOne(service);
      //   console.log(result);

      //   res.json(result)
      // })

        

        // post api for user 
        app.post('/users',async(req,res)=>{
          const user=req.body;
          const result=await userCollection.insertOne(user);
          console.log(result);
          res.json(result)
        })

        // user update 
        app.put('/users',async(req,res)=>{
          const user=req.body;
          console.log('put',user);
          const filter={email:user.email}
          const options={upsert:true};
          const updateDoc={$set:user};
          const result=await userCollection.updateOne(filter,updateDoc,options);
          console.log(result)
          res.json(result);
        })




        // for admin 

        // app.put('users/makeadmin',async(req,res)=>{
        //   const user=req.body;
        //   console.log('put',user);
        //   const filter={email:user.email};
        //   const updateDoc={$set:{role:'admin'}};
        //   const result=await userCollection.updateOne(filter.updateDoc);
        //   res.json(result);
        // })

       
       
    


     




     

     
        

        

   


 
   
         
     
      
  
  
  
  
       
  
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