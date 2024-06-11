const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as needed

app.post('/calculate', (req, res) => {
    const flights = req.body.flights;

    if (!flights || !Array.isArray(flights)) {
        return res.status(400).send({ error: 'Invalid input format. Expected a list of flights.' });
    }

    const flightMap = new Map();
    const destinations = new Set();
    const sources = new Set();

    for (let i = 0; i < flights.length; i++) {
        const [source, destination] = flights[i];
        flightMap.set(source, destination);
        sources.add(source);
        destinations.add(destination);
    }

    let start = null;
    let end = null;

    for (const source of sources) {
        if (!destinations.has(source)) {
            start = source;
            break;
        }
    }

    for (const destination of destinations) {
        if (!sources.has(destination)) {
            end = destination;
            break;
        }
    }

    if (!start || !end) {
        return res.status(400).send({ error: 'Could not determine start or end of the flight path.' });
    }

    const flightPath = [];
    let current = start;
    let prev = null;

    while (current) {
        flightPath.push(current);
        prev = current
        current = flightMap.get(current);
    }
    

    if (prev != end)
        return res.status(400).send({ error: 'Could not determine start or end of the flight path.' });

    res.send([start,end]);
});

app.listen(port, () => {
    console.log(`Flight path tracker API listening at http://localhost:${port}`);
});
