const express = require("express");
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
      console.log(req.body)
  
      if (!username) {
        return res.status(400).json({ error: true, message: 'Username is required' });  // Respond with an error if the username is not provided
      }
  
      // Query the posts collection for the current user's posts
      const posts = await db.collection('posts').find({ username }).toArray();
  
      if (posts.length === 0) {
        return res.status(404).json({ error: true, message: 'No posts found for the given username' });  // Respond with a 404 error if no posts are found
      }
  
      res.status(200).json({ error: false, message: 'Posts fetched successfully', data: posts });  // Respond with the posts data
    } catch (error) {
      console.error('Error fetching posts:', error);  // Log the error
      res.status(500).json({ error: true, message: 'Internal Server Error' });  // Respond with a 500 error for internal server issues
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
  
  


app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    const result = await postsCollection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: post },
        { returnOriginal: false }
    );
    res.send(result.value);
});


app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    await postsCollection.deleteOne({ _id: ObjectId(id) });
    res.send({ message: "Post deleted" });
});


app.post("/posts/:postId/comments", async (req, res) => {
    const comment = req.body;
    comment.postId = ObjectId(req.params.postId);
    comment.timestamp = new Date();
    const result = await commentsCollection.insertOne(comment);
    res.send(result.ops[0]);
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