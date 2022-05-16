const require = createRequire(import.meta.url);
require('dotenv').config()
import fetch from "cross-fetch";
import { createRequire } from 'module'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 8080
const express = require('express')
const app = express()
const API_KEY = process.env.OPENAI_SECRET


app.listen(port, ()=>{ console.log(`Running server on port ${port}`)})
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {
    response.render('index');
})

app.post('/', (request, response) => {
    const data = {
        prompt: request.body.input,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
    fetch("https://api.openai.com/v1/engines/"+request.body.engine+"/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(json => {
        console.log(json)
        let output = json['choices'][0]['text']
        let result = output.replaceAll(/^[,\r\n]/gm, ' ')
        let answerJSON = {'engine':request.body.engine,'prompt':request.body.input, 'response':result}
        response.render('index', {answerJSON: answerJSON});
    });
    // let answerJSON = {'prompt':request.body.input, 'response':"Result example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example...Result Example..." }
    // response.render('index', {answerJSON: answerJSON});
});

