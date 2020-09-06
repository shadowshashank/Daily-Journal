//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hi This is Shashank Sharma. I am an undergraduate student at IIT Guwahati. I will be writing blogs on my experiences of Alcheringa. I have been a long time in the fest. I am a part of Public Relations and Branding team of Alcheringa. Currently I am Head of Public Relations of Alcheringa IIT Guwahati";
const aboutContent = "Alcheringa, also known as 'Alcher', is the annual cultural festival of Indian Institute of Technology (IIT), Guwahati. The festival was started in 1996 by a group of students of IIT Guwahati. Spread over 3 days and 4 nights, Alcheringa is conducted towards the end of January every year. The 24th edition held from 30th January 2020 to 2nd February 2020, witnessing 80 events.";
const contactContent = "You can contact us at www.alcheringa.in, at our facebook and instagram page. You can also mail us at publicrelations@alcheringa.in. You can directly register at www.alcheringa.in/registration. Also checkout our campus ambassador programme www.alcheringa.in/ca. Thank You.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shashank:prhead2020@cluster0.d33ty.mongodb.net/blogDB", {useNewUrlParser: true, useFindAndModify: false});


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
