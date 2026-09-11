'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DeviceFrame from './DeviceFrame';
import PreviewToolbar from './PreviewToolbar';
import { normalizeUrl } from '../lib/url';

const TRANSITION_MS = 360;

export default function PreviewPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [draftUrl, setDraftUrl] = useState('');
  const [mode, setMode] = useState('single');
  const [orientation, setOrientation] = useState('vertical');
  const [refreshKey, setRefreshKey] = useState(0);
  const [transition, setTransition] = useState('none');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = normalizeUrl(params.get('url') || '');

    if (incoming) {
      setUrl(incoming);
      setDraftUrl(incoming);
    }
  }, []);

  function loadSite() {
    const normalized = normalizeUrl(draftUrl);

    if (!normalized) {
      setError('Enter a valid website address.');
      return;
    }

    setError('');
    setUrl(normalized);
    setDraftUrl(normalized);
    window.history.replaceState(null, '', `/preview?url=${encodeURIComponent(normalized)}`);
  }

  function goBack() {
    router.push('/');
  }

  function runTransition(outClass, inClass, applyChange) {
    if (transition !== 'none') return;

    setTransition(outClass);

    window.setTimeout(() => {
      applyChange();
      setTransition(inClass);

      window.setTimeout(() => {
        setTransition('none');
      }, TRANSITION_MS);
    }, TRANSITION_MS);
  }

  function changeMode(nextMode) {
    if (nextMode === mode) return;

    runTransition('flip-out', 'flip-in', () => setMode(nextMode));
  }

  function changeOrientation(nextOrientation) {
    if (nextOrientation === orientation) return;

    runTransition('rotate-out', 'rotate-in', () => setOrientation(nextOrientation));
  }

  function refreshPreview() {
    setRefreshKey((value) => value + 1);
  }

  return (
    <main className="preview-page">
      <header className="preview-header">
        <button className="back-button" type="button" onClick={goBack}>
          <span aria-hidden="true">←</span>
          Back
        </button>
        <div className="preview-title">
          <strong>iPhone Duo</strong>
          <span>Site Preview</span>
        </div>
        <div className="header-spacer" />
      </header>

      <PreviewToolbar
        url={draftUrl}
        onUrlChange={setDraftUrl}
        onLoad={loadSite}
        mode={mode}
        onModeChange={changeMode}
        orientation={orientation}
        onOrientationChange={changeOrientation}
        onRefresh={refreshPreview}
        disabled={transition !== 'none'}
      />

      {error ? <div className="preview-error">{error}</div> : null}

      <section className="preview-stage">
        {url ? (
          <DeviceFrame
            mode={mode}
            orientation={orientation}
            transition={transition}
            url={url}
            refreshKey={refreshKey}
          />
        ) : (
          <div className="empty-preview">Paste a website URL above to start the preview.</div>
        )}
      </section>
    </main>
  );
}
