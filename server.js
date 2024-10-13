require('dotenv').config(); // To load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Import the `child_process` module to run another file
const { exec } = require('child_process');

// Start your second script
exec('node infograbber.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(`Output: ${stdout}`);
  if (stderr) {
    console.error(`Error Output: ${stderr}`);
  }
});

// Sample route for your server
app.get('/', (req, res) => {
    res.send('Server is running with Clearbit and IPinfo API integration.');
  });

// Route to get the client IP address
app.get('/get-ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ ip });
});

app.use(bodyParser.json());
app.use(cors());

// Valid usernames and passwords stored in environment variables
const validUsernames = process.env.VALID_USERNAMES.split(',');
const validPasswords = process.env.VALID_PASSWORDS.split(',');

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check if the username and password match any valid credentials
    const usernameIndex = validUsernames.indexOf(username);
    const passwordIndex = validPasswords.indexOf(password);

    if (usernameIndex > -1 && usernameIndex === passwordIndex) {
        // Successful login
        console.log(`SUCCESSFUL LOGIN: Username "${username}" logged in at ${new Date().toISOString()}`);
        res.status(200).send({ message: 'Login successful', redirectUrl: 'admin_panel.html' });
    } else {
        // Failed login
        console.log(`FAILED LOGIN: Username "${username}" tried to log in at ${new Date().toISOString()}`);
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`============================= `);
    console.log(`    Welcome back anonymous    `);
    console.log(`============================= `);
    console.log(`        Server running        `);
    console.log(`============================= `);
    console.log(`        PORT: ${PORT}         `);
    console.log(`============================= `);
});
