import express from "express"
import bodyParser from "body-parser";

const app = express();
const profile = ["NA", "NA", "NA"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function Blog(heading, data) {
    this.title = heading;
    this.content = data;
}



app.get("/", (req, res) => {
    res.render("home.ejs",  {data: posts});
});


//USER PROFILE CODE
app.get("/user", (req,res) => {
    res.render("user.ejs", {
        name: profile[0],
        age: profile[1],
        location: profile[2],
        num: posts.length,
    });
});

app.post("/user", (req,res) => {
    if (req.body.newName) {profile[0] = req.body.newName;}
    else if (req.body.newAge) {profile[1] = req.body.newAge;}
    else if (req.body.newLocation) {profile[2] = req.body.newLocation;}

    res.render("user.ejs", {
        name: profile[0],
        age: profile[1],
        location: profile[2],
        num: posts.length,
    });
});


//CREATE NEW BLOG
app.get("/newpost", (req,res) => {
    res.render("newpost.ejs");
});


app.post("/create-blog", (req,res) => {
    const blog = new Blog(req.body.title, req.body.content);
    posts.push(blog);
    res.redirect(303, '/');
});

//EDIT BLOG
app.get("/editpost/:id", (req,res) => {
    const i = req.params.id;

    if (i < 0 || i >= posts.length) {
        res.status(400).send("Invalid Request").end();
    } else {
        res.render("edit-post.ejs", {id: i, blog: posts[i]});
    }
    
});

app.put("/editpost/:id", (req,res) => {
    const i = Number(req.params.id);

    if (i < 0 || i >= posts.length) {
        res.status(400).send("Invalid Request").end();
    } else {
        posts[i].title = req.body.title;
        posts[i].content = req.body.content;
        res.sendStatus(204);
    }
});


//GET ALL BLOGS
app.get("/posts/:id", (req, res) => {
    const i = req.params.id;

    if (i < 0 || i >= posts.length) {res.status(404).send("File Not Found");}
    else {res.render("show-post.ejs", {blog: posts[i], id: i});}   
});

//DELETE
app.delete("/posts/:id", (req, res) => {
    const i = req.params.id;

    if (i < 0 || i >= posts.length) {res.status(404).send("File Not Found");}
    else {
        let temp = posts[posts.length-1];
        posts[i] = temp;
        posts.pop();
        res.send(204).end();
    }
});

app.listen(3000, ()=> {
    console.log("Server Running");
});

var posts = [];