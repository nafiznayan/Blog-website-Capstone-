import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// const blogs = [
//   {
//     id: 1,
//     title: "Can Women Be Pastors?",
//     author: "By Jane Doe",

//     content:
//       "In this article, we will navigate these deep waters, exploring contrasting perspectives of Scripture, the views of religious denominations, and the arguments presented by experts in this still passionately debated field.",
//   },
//   {
//     id: 2,
//     title: "What is the Sign of Jonah?",
//     author: "By John Smith",

//     content:
//       "The Book of Jonah is a short but powerful story found in the Hebrew Bible. It's part of the collection called the Minor Prophets, not because it's less important, but because it's shorter than the books of the Major Prophets like Isaiah and Jeremiah.",
//   },
// ];
const blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Home Route
app.get("/", (req, res) => {
  res.render("index.ejs", {
    blogs: blogs,
  });
});

//Read More route
app.get("/read/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  res.render("readMore.ejs", { blog });
});

//New Blog form page
app.get("/new", (req, res) => {
  res.render("newBlog.ejs");
});

//Edit Blog form page
app.get("/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === blogId);
  const blog = blogs[blogIndex];
  res.render("edit.ejs", { blog });
});

//Submit New Blog
app.post("/submit", (req, res) => {
  const formData = req.body;
  const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1; // Generate unique ID
  const newBlog = { id: newId, ...formData };

  blogs.push(newBlog);

  res.render("index.ejs", { blogs: blogs });
});

//Update Blog
app.post("/update/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === blogId);

  if (blogIndex !== -1) {
    blogs[blogIndex] = {
      id: blogId,
      title: req.body.title,
      author: req.body.author,

      content: req.body.content,
    };
  }

  res.redirect("/");
});

//Delete Blog
app.get("/delete/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  console.log(blogId);
  const index = blogs.findIndex((blog) => blog.id === blogId);

  if (index !== -1) {
    blogs.splice(index, 1); // Remove the blog from the array
  }

  res.redirect("/"); // Redirect back to the home page
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
