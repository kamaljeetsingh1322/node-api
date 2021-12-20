const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./Models/post");

const app = express();
mongoose.connect(
  "mongodb+srv://mouli:root@cluster0.worx2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("Db Connected");
  }
);

var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/Insert", async (req, res) => {
  let name = req.body.name;
  let gender = req.body.gender;
  let age = req.body.age;
  var post = new Post();
  post.name = name;
  post.gender = gender;
  post.age = age;
  // To Save The Post
  post.save(function (error, savedPost) {
    if (error) {
      // send error response
      res.status(500).send({ error: "Unable to save Post " });
    } else {
      // send success response
      res.status(200).send(savedPost);
    }
  });
});

app.get("/", (req, res) => {
  Post.find({}, (err, doc) => {
    if (err) {
      res.status(500).send({ error: "unable to fetch" });
    }
    res.status(200).send(doc);
  });
});

app.post("/Delete", async (req, res) => {
  let name = req.body.name;
  Post.deleteOne({ name: name })
    .then(() => {
      res.status(200).send("Deleted");
    })
    .catch((err) => {
      res.status(500).send({ error: "Unable to Delete post" });
    });
});

app.post("/Find", async (req, res) => {
  var query = req.body.name;
  Post.find({ name: query }, (err, doc) => {
    if (err) {
      res.status(500).send("Unable to fetch post");
    }
    res.send(doc);
  });
});

app.post("/Update", async (req, res) => {
  var name = await req.body.name;
  var age = await req.body.age;
  Post.findOneAndUpdate(
    { name: name },
    { age: age },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(500).send("Unable to Update");
      } else {
        res.status(200).send(doc);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Running in the port 3000!!!");
});