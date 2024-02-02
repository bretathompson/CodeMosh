const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  const {question} = req.body;

  if (!question) {
    return res.status(400).json({error: 'Please provide a question in the request body.'});
  }

  const responses = ['Yes', 'No', 'Maybe', 'Definitely', 'Definitely Not', 'Probably', 'Probably Not'];

  const randomIndex = Math.floor(Math.random() * responses.length);
  const answer = responses[randomIndex];

  res.json(answer);
});


app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});

