const express = require("express");
const { ObjectId } = require('mongodb');
const cors = require("cors");
const returnStatus = require("./helper/returnStatus");
const {getDatabase,client} = require("./helper/connectDB")
const app = express();
app.use(express.json());

app.use(cors());

app.post("/login", async (req, res) => {
    const db = await getDatabase();
    const user = await db.collection("user").findOne({ username: req.body.username });
    if (!user) {
        const user = {username : req.body.username} ;
        const result = await db.collection("user").insertOne(user);
        return returnStatus(res,201,false,"User registered",{username : req.body.username})
    }
    return returnStatus(res,201,false,"User Login",{username : req.body.username})
});


app.post("/posts", async (req, res) => {
    const post = req.body;
    if (post){
        post.timestamp = new Date();
        const db = await getDatabase();
        const result = await db.collection("post").insertOne(post);
        return returnStatus(res,201,false,"Post complete")
    }
    return returnStatus(res,400,true,"Can not Post")
});

app.get('/currentuserposts', async (req, res) => {
    try {
      const db = await getDatabase();
      const username = req.query.username;
      console.log(req.query.username);
  
      if (!username) {
        return returnStatus(res,400,true,"No Signin , go signin first")
      }
  
      const posts = await db.collection('post').find({ username }).toArray();
  
      if (posts.length === 0) {
        return returnStatus(res,400,true,"No post found in this user")
      }
  
      return returnStatus(res,201,false,"Get Post successful",{posts})
    } catch (error) {
      console.error('Error fetching posts:', error);  
      return returnStatus(res,500,true,"Internal server Error")
    }
  });
app.get("/posts", async (req, res) => {
    const db = await getDatabase();
    try {
      const posts = await db.collection("post").find().toArray();
      if (posts) {
        
        const formattedPosts = posts.map(post => ({
          _id: post._id.toString(), 
          username: post.username,
          title: post.title,
          content: post.content,
          community: post.community,
          timestamp: post.timestamp.toISOString(), 
        }));
        return returnStatus(res, 200, false, "Posts retrieved successfully", {posts : formattedPosts});
      } else {
        return returnStatus(res, 400, true, "Cannot get posts", []);
      }
    } catch (error) {
      return returnStatus(res, 500, true, "Internal Server Error", []);
    }
  });
  
  
app.post("/postedit",async (req,res)=>{ //postid , title , content  
    console.log(req.body)
    try{
      const db = await getDatabase();
      const POST = await db.collection("post").findOneAndUpdate(
        {_id: new ObjectId(req.body.postid)},
        {$set:{
            title:req.body.title,
            content:req.body.content,
        },
    },
        {
            returnDocument:"after",
            projection:{password: 0 },
            //return the modified document without _id and password
        }
    );
    if (!POST) {
      return returnStatus(res, 404, true, "Post not found");
    }
    return returnStatus(res, 200, false, "Post Edit successfully");
    }catch(error){
      console.log("can not edit post : ",error)
      return returnStatus(res, 400, true, "Cannot edit posts");
    }
  })

app.post("/postdelete", async (req, res) => {
    try{
      const db = await getDatabase();
      const deletepost = await db.collection("post").deleteOne({ _id: new ObjectId(req.body.postid) });

      if (!deletepost){
        return returnStatus(res, 400, true, "no post");
      }
      return returnStatus(res, 200, false, "Post Delete successfully");
    }catch(error){
      return returnStatus(res, 400, true, "Cannot Delete posts");
    }

});


app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use((req,res,next)=>{
    return returnStatus(res,404,true,"Not found");
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});