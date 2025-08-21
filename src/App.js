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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
