'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppleMark from './AppleMark';
import { normalizeUrl, stripProtocol } from '../lib/url';



function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path d="M12 .8A11.2 11.2 0 0 0 8.46 22.7c.56.1.77-.24.77-.54v-2.08c-3.15.68-3.81-1.33-3.81-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.51-.29-5.15-1.26-5.15-5.61 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.61 0c2.13-1.46 3.08-1.16 3.08-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.04 0 4.36-2.65 5.31-5.17 5.6.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path d="M5.01 8.65H1.18V21h3.83V8.65ZM3.1 3A2.22 2.22 0 1 0 3.1 7.44 2.22 2.22 0 0 0 3.1 3ZM22.82 13.92c0-3.72-2-5.45-4.68-5.45-2.16 0-3.13 1.19-3.67 2.03V8.65h-3.83V21h3.83v-6.13c0-1.62.31-3.19 2.31-3.19 1.97 0 2 1.85 2 3.3V21h3.83l.01-7.08Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon">
      <path d="M18.25 2H22l-8.2 9.37L23.45 22H15.9l-5.91-6.67L4.16 22H.4l8.72-9.97L.06 2H7.8l5.34 6.08L18.25 2Zm-1.32 17.93h2.08L6.66 4H4.42l12.51 15.93Z" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="website-icon">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.1 2.35 3.1 5.35 3.1 9S14.1 18.65 12 21M12 3c-2.1 2.35-3.1 5.35-3.1 9S9.9 18.65 12 21" />
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  function handleUrlChange(event) {
    const cleaned = stripProtocol(event.target.value);
    setUrl(cleaned);
    if (error) setError('');
  }

  function handlePaste(event) {
    const pasted = event.clipboardData?.getData('text') ?? '';
    if (!pasted) return;

    event.preventDefault();
    setUrl(stripProtocol(pasted.trim()));
    if (error) setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalized = normalizeUrl(url);

    if (!normalized) {
      setError('Enter a valid website address.');
      return;
    }

    setError('');
    router.push(`/preview?url=${encodeURIComponent(normalized)}`);
  }

  return (
    <main className="home-page">
      <div className="home-glow home-glow-one" />
      <div className="home-glow home-glow-two" />

      <section className="hero-card">
        <div className="brand-mark-wrap">
          <AppleMark />
        </div>

        <p className="eyebrow">FOR WEBSITE BUILDERS</p>
        <h1>iPhone Duo Site Preview</h1>
        <p className="hero-copy">
          Paste a website link and preview it on the iPhone Duo closed and open displays.
        </p>

        <form className="url-form" onSubmit={handleSubmit}>
          <div className="url-input-shell">
            <span className="url-prefix">https://</span>
            <input
              value={url}
              onChange={handleUrlChange}
              onPaste={handlePaste}
              placeholder="yourwebsite.com"
              aria-label="Website URL"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck="false"
            />
          </div>
          <button className="primary-button" type="submit">
            Preview site
          </button>
        </form>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="home-note">
          <span className="note-dot" aria-hidden="true" />
          Interactive preview — websites must allow iframe embedding.
        </div>
      </section>

     <footer className="home-footer">
        <p>Rahul Singh Jadoun</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/rahul-singh-jadoun-7a846a28b?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="social-link">
            <span className="social-icon-wrap"><LinkedInIcon /></span>
            <span>linkedin.com/in/rahul-singh-jadoun-7a846a28b</span>
          </a>
          <span>·</span>
          <a href="https://x.com/rahulsi71457594" target="_blank" rel="noreferrer" aria-label="X profile" className="social-link">
            <span className="social-icon-wrap"><XIcon /></span>
            <span>x.com/rahulsi71457594</span>
          </a>
          <span>·</span>
          <a href="https://github.com/rahul-singh92" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="social-link">
            <span className="social-icon-wrap"><GitHubIcon /></span>
            <span>github.com/rahul-singh92</span>
          </a>
        </div>
        
        {/* New GitHub Star CTA */}
        <p style={{ marginTop: '16px' }}>
          <a 
            href="https://github.com/rahul-singh92/iphone-duo-site-preview" 
            target="_blank" 
            rel="noreferrer" 
            style={{ color: 'inherit', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GitHubIcon style={{ width: '16px', height: '16px' }} />
            Give a star if you like it! ⭐️
          </a>
        </p>
      </footer>
    </main>
  );
}
