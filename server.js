const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/log-credentials', (req, res) => {
    const { username, password } = req.body;

    // Log credentials to the console (or save them to a database)
    console.log('Username:', username);
    console.log('Password:', password);

    // Send a response to the client
    res.status(200).send('Credentials logged successfully');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

