// app.js
const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const port = 8080;
const cors=require('cors');

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

//app.get('/', (req, res) => {
//    res.send('Express JS on Vercel')
//})

app.get('/getResults', (req, res) => {
    const fileName = '/results.json';

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading results from file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const results = data;
            res.json(results);
        }
    });
});

app.post('/saveResults', cors(), (req, res) => {
    const results = req.body;
    const fileName = '/tmp/results.json';
    //const filePath = path.join(__dirname, fileName);


    try {
        // Append new results to the file
        fs.appendFileSync(fileName, JSON.stringify(results) + '\n');

        console.log('Results appended to:', fileName);
        res.status(200).send('Results saved successfully');
    } catch (err) {
        console.error('Error appending results to file:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

