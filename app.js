import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import validateUrl from "./middleware/validateUrl.js"
import Url from "./models/urlModel.js";


const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("connected to db")})
.catch(err=>console.error(err.message))


app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/link", validateUrl, (req,res)=>{
    const {url} = req.body;

    let id = nanoid(7);
    let newURL = new Url({url, id})

    try{
        newURL.save()
    }catch (err){
        res.status(400).send("Something went wrong")
    }
    res.json({message:`http://localhost:3000/${newURL.id}`,status:"200"})
})


app.get("/:id", async (req, res) => {
    const id = req.params.id;
    const longUrl = await Url.findOne({ id });
  
    if (!longUrl) {
      return res.sendFile(__dirname + "/public/404.html");
    }
    res.redirect(longUrl.url);
  });

app.listen(3000, ()=>{
    console.log("server started at port 3000");
});