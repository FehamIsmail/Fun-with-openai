import fetch from "cross-fetch";
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
require('dotenv').config()
const express = require('express')
const app = express()
const API_KEY = process.env.OPENAI_SECRET

app.listen(5000)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {
    response.render('index');
})

app.post('/', (request, response) => {
    const data = {
        // prompt: request.params.input,
        prompt: request.body.input,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(json => {
        let output = json['choices'][0]['text']
        let result = output.replaceAll(/^[\r\n]/gm, '')
        console.log('Result: ' + result)
        response.render('index', {answer: result});
    });
});

