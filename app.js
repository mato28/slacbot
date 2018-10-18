const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(bodyParser.json());

let token = "";



function response(payload) {
    
    const url = 'https://slack.com/api/chat.postMessage';
    fetch(url, {
        method : "POST",
        
        // -- or --
        body : JSON.stringify({
            text: "Hello <@"+ payload.event.user + ">! Knock, knock.",
            channel: payload.event.channel
        }),
            headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer xoxp-457078935811-458228207335-458330541504-bb7b7564bee166f48f5d9ec14504ab3a'},
        }).then(
            response => response.text() // .json(), etc.
            // same as function(response) {return response.text();}
        ).then(
            html => console.log(html)
        );
}

// app.post('/bot', (req, res) => {
//     const challenge = req.body.challenge;
//     token = req.body.token;
//     res.send(challenge);
// });

app.post('/slash', (req, res) => {

    res.send("test");
    console.log(req.body);
});

app.post("/bot", (req, res, next) => {
    // Get event payload
    let payload = req.body;

    console.log(req.body);
    res.sendStatus(200);
    // Respond to this event with HTTP 200 status
    if (payload.event.type === "app_mention") {
        if (payload.event.text.includes("test")) {
            response(payload);
        }
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));