const express = require('express')
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://potter:VnjNTtfDN0fXnsxz@cluster0-ejqfc.mongodb.net/nodedb?retryWrites=true&w=majority").then(
  ()=>{
      console.log("Connected to database!!")
  })
  .catch(()=>{
    console.log('Connection failed...');
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH, OPTIONS"
    );
    next();
})
app.post("/api/posts",(req,res, next)=>{
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });//req.body;
  post.save();
  console.log(post);

  res.status(201).json({
    message:"Post Loaded successfully"
  })
})
app.get('/api/posts',(req, res, next)=>{
  Post.find().then(
    documents=>{
      console.log(documents);
      res.status(200).json({
        message:"Post fetched successfully",
        posts:documents
      });
    });

app.delete("/api/posts/:id",(req, res, next)=>{
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
  //console.log(req.params.id)
  /*res.status(200).json({
    message:"Post deleted!"
  });*/
});

});

module.exports = app;
