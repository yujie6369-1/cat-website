import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

function App() {
  const [showCat, setShowCat] = useState(false);

  return (
    <div className="App">
      <h1>這是一個貓咪網站</h1>
      <button onClick={() => setShowCat(true)}>貓</button>
      {showCat && (
        <div style={{ marginTop: '20px' }}>
          <img src="https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg" alt="cat" style={{ maxWidth: '300px', borderRadius: '12px' }} />
        </div>
      )}
  {/* 已移除 React 標誌與說明文字 */}
    </div>
  );
}

export default App;
