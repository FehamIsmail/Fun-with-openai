//Importing required dependencies
const require = createRequire(import.meta.url);
require('dotenv').config()
import fetch from "cross-fetch";
import { createRequire } from 'module'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 5000
const express = require('express')
const app = express()
const API_KEY = process.env.OPENAI_SECRET

//Opening the server
app.listen(port, ()=>{ console.log(`Running server on port ${port}`)})

//Initializing the express app
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));


//Handles default GET request with no variable
app.get('/', (request, response) => {
    response.render('index');
})

//Handles POST request when submit button has been pressed
app.post('/', (request, response) => {
    const data = {
        prompt: request.body.input,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
    //Fetching response from OpenAI
    fetch("https://api.openai.com/v1/engines/"+request.body.engine+"/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
    //Handling response from OpenAI
    }).then(res => res.json()).then(json => {
        let output = json['choices'][0]['text']
        let result = output.replaceAll(/^[,\r\n]/gm, ' ')
        let answerJSON = {'engine':request.body.engine,'prompt':request.body.input, 'response':result}
        response.render('index', {answerJSON: answerJSON});
    });
});

