import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    try {
      const response = await axios.post(
        'https://api-ssl.bitly.com/v4/shorten',
        {
          long_url: url
        },
        {
          headers: {
            Authorization: 'Bearer fc37b6d66ce25c5819db3d00c1b09ad006fe44d1',
            'Content-Type': 'application/json'
          }
        }
      );
      setShortUrl(response.data.link);
      setCopied(false);
    } catch (error) {
      console.error('Error Shortening URL', error);
    }
  };

  return (
    <div className="App">
      <div className="banner"></div>
      <div className="container">
        <h1>🔗 URL Shortener</h1>

        <div className="input-container">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL here"
          />
          <button onClick={handleShorten}>Shorten</button>
        </div>

        {shortUrl && (
          <div className="result-container">
            <p>
              Shortened URL:{' '}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>

            <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
              <button className="copy-button">
                {copied ? 'Copied ✅' : 'Copy 🔗'}
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;