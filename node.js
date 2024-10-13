const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { exec } = require('child_process');

app.use(bodyParser.json());

// Endpoint to start attack
app.post('/start-attack', (req, res) => {
    const { ip, port, type } = req.body;

    // Replace this with actual attack logic
    exec(`attack-tool --ip ${ip} --port ${port} --type ${type}`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send('Error starting attack');
        }
        res.send('Attack started');
    });
});

// Endpoint to stop attack
app.post('/stop-attack', (req, res) => {
    // Replace this with actual logic to stop the attack
    exec('stop-attack-tool', (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send('Error stopping attack');
        }
        res.send('Attack stopped');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
