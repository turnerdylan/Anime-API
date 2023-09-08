
/*MY proj

api for finding new anime and giving descriptions of the show plus ratings

filter by rating of 5 and up or whatever
most popular
episode count

anime attributes
createdat
updatedat
slug
synopsis
titles[]
canonTitle
category
rating
startdate
enddate
popularity
etc

can only use GET unless admin



*/

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const API_PATH = "https://kitsu.io/api/edge";

const OAUTH_PATH = "https://kitsu.io/api/oauth";

const access_token_path = "https://kitsu.io/api/oauth/token";

const config = {
    // headers: { 
    //     Accept: app/vnd.api+json,
    //     Content-Type: app/vnd.api+json
    // },
  };

//Accept: application/vnd.api+json
//Content-Type: application/vnd.api+json

app.use('/public', express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", async (req, res) => {

    console.log(req.body);

    try {
        const result = await axios.get(API_PATH + "/anime?filter[categories]=adventure", config)
        //console.log(result.data);
        res.render("index.ejs", { content: result.data})
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
    

})

app.post("/random", async (req, res) => {
    try {
        const result = await axios.get(API_PATH + "/anime", config)
        //console.log(result.data);
        res.render("index.ejs", { anime : result.data})
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})