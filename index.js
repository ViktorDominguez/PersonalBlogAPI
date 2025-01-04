import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Migration: CSU verschärft vor der Bundestagswahl den Ton",
    content:
      "Ein wichtiges Thema im Wahlkampf ist die schon lange kontrovers geführte Migrationsdebatte. Nach dem tödlichen Attentat auf einen Weihnachtsmarkt in Magdeburg (Sachsen-Anhalt) kurz vor Heiligabend hat sich die Stimmungs- und Tonlage nochmals zugespitzt. Der Tatverdächtige stammt aus Saudi-Arabien und soll nach bisherigen Erkenntnissen in sozialen Medien mehrmals einen Anschlag angekündigt haben. Auch vor diesem Hintergrund fordern mit Ausnahme der Linkspartei alle Parteien eine strengere Migrationspolitik.",
    author: "Marcel Fürstenau / Deutche Welle",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Neues Wahlrecht - was ändert sich bei der Bundestagswahl?",
    content:
      "Im Februar wird in Deutschland ein neuer Bundestag gewählt – dieses Mal mit weniger Abgeordneten. Das Parlament hat das Wahlrecht nach langem Ringen reformiert. Das wird Folgen haben - wohl auch schon im Wahlkampf.",
    author: "Volker Witting / Deutche Welle",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts

app.get("/posts", (req, res) => {  
  console.log(posts);
  res.json(posts);  
 });

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {  
  const id = parseInt(req.params.id);
  const mapIndexId = posts.findIndex((x) => x.id === id);   
  if (!mapIndexId) return res.status(404).json({ message: "Post not found" });
  res.json(posts[mapIndexId]);  
 });
//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {  
  const newId = lastId += 1;
  const newObject = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  posts.push(newObject); 
  res.status(201).json(posts[newId]);
  lastId = newId; 
 });
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {  
  const id = parseInt(req.params.id);
  const mapIndexId = posts.findIndex((x) => x.id === id);
  if (!mapIndexId) return res.status(404).json({ message: "Post not found" });

    if (req.body.title) posts[mapIndexId].title = req.body.title;
    if (req.body.content) posts[mapIndexId].content = req.body.content; 
    if (req.body.author) posts[mapIndexId].author = req.body.author; 

  res.json(posts[mapIndexId]);
 });
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {  
  const id = parseInt(req.params.id);
  const mapIndexId = posts.findIndex((x) => x.id === id);   
  if (mapIndexId === -1) return res.status(404).json({ message: "Post not found" });
  posts.splice(mapIndexId, 1);
  res.json({ message: "Post deleted" });
 });

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
