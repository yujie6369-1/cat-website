
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

// 註冊 API
app.post('/register', (req, res) => {
  const { username, password, pin } = req.body;
  // 這裡假設 pin 必須是 "20070806"
  if (pin !== '20070806') {
    return res.status(400).json({ message: 'PIN 錯誤' });
  }
  let users = [];
  if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json'));
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: '帳號已存在' });
  }
  users.push({ username, password });
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  res.json({ message: '註冊成功' });
});

// 登入 API
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let users = [];
  if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json'));
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ message: '帳號或密碼錯誤' });
  }
  res.json({ message: '登入成功' });
});


// 測試 API
app.get('/test', (req, res) => {
  res.send('API OK');
});

// 安全的 users.json 檢視 API，需帶 secret 參數
app.get('/show-users', (req, res) => {
  const secret = req.query.secret;
  // 請自行更改這個 secret 值，避免被他人猜到
  if (secret !== 'mySuperSecret123') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const usersPath = path.join(__dirname, 'users.json');
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read users.json' });
    }
    res.type('json').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});