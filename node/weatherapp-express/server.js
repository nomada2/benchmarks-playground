const express = require('express')
const request = require('request')
const app = express()
const port = 5000

var options = {
    method: 'GET',
    uri: 'http://localhost:5000/forecast',
    resolveWithFullResponse: true
};

async function makeRequest (options) {
return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
        if (error) {
            return reject(error);
        }
        return resolve({ body, response });
        })
    })
}
  

app.get('/', async (req, res) => 
{
    let r = await makeRequest(options);
    res.json({ location: 'Seattle', weather: r.body });
});

app.get('/forecast', (req, res) => 
{
    res.status(200);
    res.contentType("text/plain");
    res.send("Cloudy");
});

app.listen(port, () => console.log(`app listening on port ${port}!`))