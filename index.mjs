import fetch from "cross-fetch";
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
require('dotenv').config()
const express = require('express')
const router = require('./routes/main.js')
const app = express()
const API_KEY = process.env.OPENAI_SECRET
const responses = 'yo';

app.listen(5000)
app.set('view engine', 'ejs')
app.use(router)

app.get('/', (request, response) => {
    response.render('index', {responses: responses});
})

app.get('/:input', async (request, response) => {
    const data = {
        prompt: request.params.input,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
    let result = "NO RESPONSE";
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(json => {
        let output = json['choices'][0]['text']
        result = output.replaceAll(/^[\r\n]/gm, '')
    });
    response.send(result);
});

