
import pingchengImg from './images/139240.jpg';
import './App.css';
import { useState } from 'react';

function App() {
  const [showCat, setShowCat] = useState(false);
  // 註冊表單狀態
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  // 註冊表單送出
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterMsg("");
    try {
      const res = await fetch("https://cat-website.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, pin })
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterMsg("✅ " + data.message);
      } else {
        setRegisterMsg("❌ " + data.message);
      }
    } catch (err) {
      setRegisterMsg("❌ 註冊失敗，請稍後再試");
    }
  };

  return (
    <div className="App">
      <h1>欸!不揪喔</h1>

      {/* 註冊表單 */}
      <form onSubmit={handleRegister} style={{ marginBottom: 24, border: '1px solid #ccc', padding: 16, borderRadius: 8, maxWidth: 320, margin: '0 auto' }}>
        <h2>註冊</h2>
        <div style={{ marginBottom: 8 }}>
          <input type="text" placeholder="帳號" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: 6 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input type="password" placeholder="密碼" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 6 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input type="text" placeholder="PIN碼（請向站長索取）" value={pin} onChange={e => setPin(e.target.value)} required style={{ width: '100%', padding: 6 }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 8 }}>註冊</button>
        {registerMsg && <div style={{ marginTop: 10 }}>{registerMsg}</div>}
      </form>

      <button onClick={() => setShowCat(true)}>把波</button>
      {showCat && (
        <div style={{ marginTop: '20px' }}>
          <img src={pingchengImg} alt="pingcheng" style={{ maxWidth: '300px', borderRadius: '12px' }} />
        </div>
      )}
      {/* 已移除 React 標誌與說明文字 */}
    </div>
  );
}

export default App;
