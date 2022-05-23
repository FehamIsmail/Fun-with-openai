# Fun-with-openai
Website URL: http://fun-with-ai.us-east-2.elasticbeanstalk.com/ <br>
OpenAI: https://openai.com/


<h1>How to use</h1>

Fun with OpenAI is a simple to use, OpenAI-powered website. Simply select an engine where the cheapest and fastest is text-ada-001 and the most expensive, text-curie-001. Then,
write any prompt to send for the AI to respond. Next, press the submit button and wait for the AI to respond. All the responses will be stored in the user's local storage.
If you wish to clear all responses, simply click the 'Clear' button!

For example, you can write 'write me a poem about dogs' and the AI will respond with a computer-generated poem about dogs.. Don't believe me? Try it yourself!

<h1>How it works?</h1>

Fun with OpenAI will send a POST HTTP request containing the user's prompt as well as the engine choosed to OpenAI's API. Then, the API will send with a JSON file
containing different information namely, the response to the user's prompt. Then, the response will be stored in the user's local storage, which will be printed into
the HTML.

<h4>API Key</h4>
If you wish to use your own API Key, it is recommanded to change it in the .env_sample file. Once this is done, make sure to rename the file to .env.

<span>API Key expires the August 9<sup>th</sup>, 2022</span>
