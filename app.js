const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(bodyParser.json());


// token generated for workspace
let token = "xoxp-457078935811-458228207335-458330541504-bb7b7564bee166f48f5d9ec14504ab3a";



function response(payload) {
    
    const url = 'https://slack.com/api/chat.postMessage';
    fetch(url, {
        method : "POST",
        body : JSON.stringify({
            text: "Hello <@"+ payload.event.user + ">! Knock, knock.", // response of bot <@userID> tag user
            channel: payload.event.channel // channel to post text
        }),
            headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer ' + token},
        }).then(
            response => response.text() // .json(), etc.
            // same as function(response) {return response.text();}
        ).then(
            html => console.log(html)
        );
}

// slash comand on create set endpoint for new comand
app.post('/slash', (req, res) => {

    res.send("test"); // response text on chat
    console.log(req.body);
});

// for verify url for bot only need in configuration
// app.post('/bot', (req, res) => {
//     const challenge = req.body.challenge;
//     token = req.body.token;
//     res.send(challenge);
// });



// endpoint for bot 
app.post("/bot", (req, res, next) => {
    // Get event payload
    let payload = req.body;

    console.log(req.body);
    res.sendStatus(200);
    // Respond to this event with HTTP 200 status
    if (payload.event.type === "app_mention") { // if bot is mention in chat
        if (payload.event.text.includes("test")) { // key words in message
            response(payload);
        }
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));