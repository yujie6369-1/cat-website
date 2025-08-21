
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// 連接 MongoDB Atlas
mongoose.connect('mongodb+srv://chenyujie6369:NOx4j447AndwUHc5@websitetest.bhwzvnc.mongodb.net/?retryWrites=true&w=majority&appName=websitetest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

// 註冊 API
app.post('/register', async (req, res) => {
  const { username, password, pin } = req.body;
  if (pin !== '200708060') {
    return res.status(400).json({ message: 'PIN 錯誤' });
  }
  try {
    const exist = await User.findOne({ username });
    if (exist) {
      return res.status(400).json({ message: '帳號已存在' });
    }
    const user = new User({ username, password });
    await user.save();
    res.json({ message: '註冊成功' });
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
});

// 登入 API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: '帳號或密碼錯誤' });
    }
    res.json({ message: '登入成功' });
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤', error: err.message });
  }
});


// 測試 API
app.get('/test', (req, res) => {
  res.send('API OK');
});

// 安全的 MongoDB 使用者查詢 API，需帶 secret 參數
app.get('/show-users', async (req, res) => {
  const secret = req.query.secret;
  if (secret !== 'mySuperSecret123') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const users = await User.find({}, { _id: 0, __v: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});