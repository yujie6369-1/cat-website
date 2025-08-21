const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(express.json());

// 註冊 API
app.post('/register', (req, res) => {
  const { username, password, pin } = req.body;
  // 這裡假設 pin 必須是 "1234"
  if (pin !== '1234') {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});