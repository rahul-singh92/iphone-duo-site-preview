'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getDeviceDimensions } from '../lib/device';

const LOAD_TIMEOUT_MS = 7500;

export default function DeviceFrame({ mode, orientation, transition, url, refreshKey }) {
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const dims = useMemo(
    () => getDeviceDimensions(mode, orientation),
    [mode, orientation],
  );

  const iframeKey = `${url}-${refreshKey}`;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const updateScale = () => {
      const { width, height } = stage.getBoundingClientRect();
      const padding = 48;

      const widthScale = (width - padding) / dims.totalWidth;
      const heightScale = (height - padding) / dims.totalHeight;
      const nextScale = Math.max(Math.min(widthScale, heightScale, 1), 0.15);

      setScale(nextScale);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(stage);

    return () => observer.disconnect();
  }, [dims.totalWidth, dims.totalHeight]);

  // Replace your existing useEffect in DeviceFrame.js with this:
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setIframeError(false);

    async function checkUrl() {
      try {
        const response = await fetch(`/api/check-frame?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (isMounted && !data.canEmbed) {
          setIframeError(true);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setIframeError(true);
          setLoading(false);
        }
      }
    }

    checkUrl();

    // Fallback timeout just in case it takes too long to load
    const timeout = window.setTimeout(() => {
      if (isMounted) {
        setLoading((currentLoading) => {
          if (!currentLoading) return currentLoading;
          setIframeError(true);
          return false;
        });
      }
    }, LOAD_TIMEOUT_MS);

    return () => {
      isMounted = false;
      window.clearTimeout(timeout);
    };
  }, [iframeKey]);

  function handleIframeLoad() {
    setLoading(false);
    setIframeError(false);
  }

  function handleIframeError() {
    setLoading(false);
    setIframeError(true);
  }

  const transitionClass =
    transition === 'flip-out'
      ? 'device-animation-flip-out'
      : transition === 'flip-in'
        ? 'device-animation-flip-in'
        : transition === 'rotate-out'
          ? 'device-animation-rotate-out'
          : transition === 'rotate-in'
            ? 'device-animation-rotate-in'
            : '';

  return (
    <div ref={stageRef} className="device-frame" aria-label={`${mode} ${orientation} preview`}>
      <div
        className={`device-center ${transitionClass}`}
        style={{
          width: `${dims.totalWidth}px`,
          height: `${dims.totalHeight}px`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          '--device-scale': scale,
        }}
      >
        <div
          className={`device-shell device-shell-${mode}`}
          style={{
            width: `${dims.totalWidth}px`,
            height: `${dims.totalHeight}px`,
          }}
        >
          <div
            className="device-screen"
            style={{
              width: `${dims.viewportWidth}px`,
              height: `${dims.viewportHeight}px`,
            }}
          >
            {loading && (
              <div className="iframe-loader" role="status" aria-live="polite">
                <div className="loader-spinner" aria-hidden="true" />
                <span>Loading preview</span>
              </div>
            )}

            {iframeError && (
              <div className="iframe-blocked" role="alert">
                <div className="blocked-icon" aria-hidden="true">↗</div>
                <strong>Can’t preview this site</strong>
                <p>
                  Iframe embedding is disabled for this site, so it can’t be previewed here.
                </p>
              </div>
            )}

            <iframe
              key={iframeKey}
              className={`site-iframe ${loading || iframeError ? 'site-iframe-hidden' : ''}`}
              width={dims.viewportWidth}
              height={dims.viewportHeight}
              src={url}
              title={`Website preview — ${dims.label}`}
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
