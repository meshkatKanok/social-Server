const express=require('express')
const app = express()
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port=process.env.port || 5000
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("social media is Running")
})

const uri =`mongodb+srv://${process.env.User_name}:${process.env.User_pass}@cluster0.tasnahm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
    try{
        const userpostData = client.db("postdata").collection("userpost");
        const usercommentData = client.db("commentdata").collection("commentpost");
        const userlikeData = client.db("likedata").collection("liketpost");
        const userregisterData = client.db("postdata").collection("registerData");
        // const userlikeData = client.db("postdata").collection("liketpost");
        app.post('/postData',async(req,res)=>{
              const post=req.body
              const allPost=await userpostData.insertOne(post)
              res.send(allPost)

        })
        app.post('/registerData',async(req,res)=>{
              const post=req.body
              const allPost=await userregisterData.insertOne(post)
              res.send(allPost)

        })
        app.get('/registerData',async(req,res)=>{
            const query={}
            const cursor=userregisterData.find(query)
            const allPost=await cursor.toArray()
            res.send(allPost)
        })
        app.get('/postData',async(req,res)=>{
            const query={}
            const cursor=userpostData.find(query)
            const allPost=await cursor.toArray()
            res.send(allPost)
        })
        app.get('/post/:id',async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const allPost=await userpostData.findOne(query)
            res.send(allPost)
        })

        app.delete('/postData/:id',async(req,res)=>{
            const id =req.params.id
            const query={_id:ObjectId(id)}
            const deleteData=await userpostData.deleteOne(query)
            res.send(deleteData)
        })

        app.post('/commentData',async(req,res)=>{
            const commetpost=req.body
            const allComnt=await usercommentData.insertOne(commetpost)
            res.send(allComnt)
        })
        app.get('/commentData',async(req,res)=>{
            const query={}
            const cursor=usercommentData.find(query)
            const allcomment=await cursor.toArray()
            res.send(allcomment)
        })
        
        app.post('/likeData',async(req,res)=>{
            const likepost=req.body
            const allike=await userlikeData.insertOne(likepost)
            res.send(allike)
        })
        app.get('/likeData',async(req,res)=>{
            const query={}
            const cursor=userlikeData.find(query)
            const allLike=await cursor.toArray()
            console.log(allLike);
            res.send(allLike)
        })
 

      

       
        

    }
    finally{

    }
 }
 run().catch(console.dir)
 

   
 


app.listen(port,()=>{
    console.log(`social on port ${port}`);
})