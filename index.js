import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
    try{
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=21,23.75,39.9523&longitude=57,54.5,-75.1638&hourly=temperature_2m&forecast_days=1");
        const result = response.data;
        const time = result[req.body["country"]].hourly.time;
        const temperature = result[req.body["country"]].hourly.temperature_2m;

        res.render("index.ejs", {data: result,time: time, temperature: temperature});
        console.log(req.body["country"]);

    } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs");
  }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`); 
});