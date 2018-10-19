const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// token generated for workspace
let token = "xoxb-460185489317-459921751539-aBOTAgojhVOxggZNfXc0NGgt";


// const revoke = 'https://slack.com/api/auth.revoke?token=' + token;
// fetch(revoke, {
//         method : "GET",
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
//     }).then(
//         response => response.json() // .json(), etc.
//         // same as function(response) {return response.text();}
//     ).then(
//         html => console.log(html)
//     );


function response(payload) {
    
    const url = 'https://slack.com/api/chat.postMessage';
    fetch(url, {
        method : "POST",
        body : JSON.stringify({
            text: "Hello <@"+ payload.event.user + ">! Knock, knock.", // response of bot <@userID> tag user
            channel: payload.event.channel // channel to post text
        }),
            headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer '+ token},
        }).then(
            response => response.text() // .json(), etc.
            // same as function(response) {return response.text();}
        ).then(
            html => console.log(html)
        );
}


function response2(payload) {
    
    const url = 'https://slack.com/api/chat.postMessage';
    fetch(url, {
        method : "POST",
        body : JSON.stringify({
            text: "channel rename", // response of bot <@userID> tag user
            channel: payload.event.channel.id // channel to post text
        }),
            headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer '+ token},
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

// // for verify url for bot only need in configuration
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
    } else if (payload.event.type === "channel_rename") {
        response2(payload);
        console.log("channel rename");
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));